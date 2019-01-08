var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var mongoose = require("mongoose");

mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/formnote");

app.use("/", (req, res) => {
 res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
 console.log("Server listening on port " + port);
});

var nameSchema = new mongoose.Schema({
 srNumber: String,
 notePad: String
});

var Notes = mongoose.model("Notes", nameSchema);

app.post("/addnote", (req, res) => {
 var myData = new Notes(req.body);
 myData.save()
 .then(item => {
 res.send("Note has been saved");
 })
 .catch(err => {
 res.status(400).send("unable to save to database");
 });
});