var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var PORT = 3000;
app.get("/", function (req, res) {
    res.send("Hello World!");
});
