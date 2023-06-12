import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxiRankComponent } from './taxi-rank.component';

describe('TaxiRankComponent', () => {
  let component: TaxiRankComponent;
  let fixture: ComponentFixture<TaxiRankComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaxiRankComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaxiRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
