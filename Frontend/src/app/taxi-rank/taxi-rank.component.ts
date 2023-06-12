import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taxi-rank',
  templateUrl: './taxi-rank.component.html',
  styleUrls: ['./taxi-rank.component.scss']
})

export class TaxiRankComponent implements OnInit {



  ngOnInit() {
    document.addEventListener('alpine:init', () => {
      Alpine.data('rank', () => {
        return {
          init() {
            // console.log('Hi Oz');
          },
          open: false,
          mainRank: 'Cape Town',
          ranks: this.$persist([
            {
              destination: 'Belhar',
              limit: 2,
              queue: 0,
              fare: 22,
              trips: 0,
              taxis: 4,
              overallTotal: 0,
              profit: 0,
              feedback: '',
            },
            {
              destination: 'Parow',
              limit: 7,
              queue: 0,
              fare: 18,
              trips: 0,
              taxis: 4,
              overallTotal: 0,
              profit: 0,
              feedback: '',
            },
            {
              destination: 'Woodstock',
              limit: 7,
              queue: 0,
              fare: 12,
              trips: 0,
              taxis: 4,
              overallTotal: 0,
              profit: 0,
              feedback: '',
            },
          ]).as('Taxi Rank Details'),
          addRoute(stop: string, fare: number) {
            this.ranks.push({
              destination: stop,
              limit: 7,
              taxiLimit: 1,
              queue: 0,
              fare: fare,
              trips: 0,
              taxis: 4,
              overallTotal: 0,
            });
          },
          queueInLine(destination: any) {
            destination.queue++;
            if (destination.queue >= 7) {
              destination.feedback = this.taxiFull;
              setTimeout(() => {
                destination.feedback = '';
              }, 3000);
            }
          },
          leaveQueue(destination: any) {
            if (destination.queue >= 1) {
              destination.queue--;
            } else {
              destination.feedback = this.invalidAction;
              setTimeout(() => {
                destination.feedback = '';
              }, 3000);
            }
          },
          leave(destination: any) {
            if (destination.queue <= 6) {
              destination.feedback = this.taxiNotFull;
              setTimeout(() => {
                destination.feedback = '';
              });
            } else if (destination.taxis == 0) {
              destination.feedback = this.notAvailable;
              setTimeout(() => {
                destination.feedback = '';
              }, 3000);
            } else {
              destination.trips++;
              destination.taxis--;
              destination.queue -= destination.limit;
              this.getTotalFare(destination);
              this.madeADay(destination);
            }