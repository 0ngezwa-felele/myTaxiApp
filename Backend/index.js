//
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 5050;

const db = require("./api");


const cors = require("cors");

require("dotenv").config();


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(cors());

app.get("/", (req, res) => {
  res.json({ info: "Node.js, Express, and Postgres API" });
});


app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);




app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
