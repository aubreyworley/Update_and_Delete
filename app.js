var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var _ = require("underscore");

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json 
app.use(bodyParser.json());

// serve js and css files from public folder
app.use(express.static(__dirname + '/public'));


// pre-seeded phrase data

var users = [
  {
    id: 1, 
    username: "bob",
    firstname: "Bob",
    lastname: "Jones",
    age: 35
},
  {
  id: 2, 
    username: "joe",
    firstname: "Joseph",
    lastname: "Smith",
    age: 23
  }
];

//Routes
//root route (serves index.html)
app.get("/users/app", function (req, res) {
  res.sendFile(_dirname + '/public/views/index.html');
});

//users index
app.get("/users", function(req, res) {
  res.json(users);
});

app.post("/users", function(req, res){
  var newUser = req.body; 

  users.push(newUser);

  res.json(newUser);
});

//update users
app.put('/users/:id', function(req, res) {

  // set the value of the id
  var targetId = parseInt(req.params.id);

  // find item in `phrases` array matching the id
  var foundUser = _.findWhere(users, {id: targetId});

  // if form gave us a new word, update the phrase's word
  foundUser.username = req.body.username || foundUser.username;

  // if form gave us a new firstname, update that
  foundUser.firstname = req.body.firstname || foundUser.firstname;

  // send back edited object
  res.json(foundUser);

});

app.delete('/users/:id', function(req, res){
  // set the value of the id
  var targetId = parseInt(req.params.id);

  for (var i = 0; i < users.length; i++) {
    if (targetId === users[i].id) {
      users.splice(i, 1);
    }
  }

  res.send("Ok it was deleted");
})

app.put('/users/:id', function(req, res){
    var targetID = parseInt(req.params.id);
    var foundUser = _.findWhere(users, {id: targetID})
    foundUser.username = req.body.username;
    foundUser.firstname = req.body.firstname;
    foundUser.lastname = req.body.lastname;
    foundUser.age = parseInt(req.body.age);
    res.json(targetID);
});

app.delete('/users/:id', function(req, res){
    var targetID = parseInt(req.params.id);
    var foundUser = _.findWhere(users, {id: targetID})
    var index = users.indexOf(foundUser);
    users.splice(index, 1);
    res.json(foundUser);

app.listen(3000);