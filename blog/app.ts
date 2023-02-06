const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;


app.get("/", (req, res) => {
    res.send("Hello World!");
});
