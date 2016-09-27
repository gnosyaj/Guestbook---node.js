var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


var entries = [];
app.locals.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false}));

app.get("/", function(request, response) {
  response.render('index');
});

//Renders new entry page
app.get("/new-entry", function(request, response) {
  response.render('new-entry');
});

app.post("/new-entry", function(request, response) {
  if (!request.body.title || !request.body.body) {
    response.status(400) .send("Entries must have a title and a body.")
    return;
  }
  // Adds a new entry
  entries.push({
    title: request.body.title,
    content: request.body.body,
    published: new Date()
  });
  // redirects to home page and you can also see your entry
  response.redirect("/");
});

// Renders a 404 page because you're requesting an unknown source
app.use(function(request, response) {
  response.status(404) .render("404)");
});

//Starts the server on port : 3000
// (shortcut to the following code: app.listen('port#'))
http.createServer(app).listen(3000, function() {
  console.log("Guestbook app started on port 3000.");
});
