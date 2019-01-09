var express = require('express');
var app = express();
app.get('/', function(req, res) {
res.sendFile(__dirname + '/index.html');});
app.use(express.static(__dirname + '/'));

var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose');
global.Promise = mongoose.Promise
console.log(console.log(mongoose.connection.readyState));

mongoose.connect("mongodb://localhost:27017/formnote");

var nameSchema = new mongoose.Schema({
 srNumber: String,
 summary: String,
 notePad: String,
});


var Notes = mongoose.model("Notes", nameSchema);

app.get("/", (req, res) => {
     res.sendFile(__dirname + "/index.html");
});

app.post("/addnote", (req, res) => {
    var myData = new Notes(req.body);
    myData.save()
        .then(item => {
            res.send("Notes saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});

// var nameSchema = new mongoose.Schema({
//  srNumber: String,
//  summary: String,
//  notePad: String,
// });
//
// var Notes = mongoose.model("Notes", nameSchema);
//
// app.post("/addnote", (req, res) => {
//  var myData = new Notes(req.body);
//  myData.save()
//  .then(item => {
//  res.send("Note has been saved");
//  })
//  .catch(err => {
//  res.status(400).send("unable to save to database");
//  });
// });
