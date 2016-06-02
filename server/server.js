"use strict";

var express        = require('express');
var bodyParser     = require('body-parser');
var logger         = require('morgan');
var methodOverride = require('method-override');
var multer         = require('multer');
var path           = require('path');
var _              = require('lodash');
var app            = express();
var fs             = require('fs');
var http           = require('http').createServer(app);
var xml2Json       = require('xml2Json');
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json()); //can associate more than 1 middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
}

app.post("/parseXML", function(request, response) {
  var message = request.file;

  if(message && message.trim().length > 0) {
    // sender
    var user       = request.body.user;
    var created_at = request.body.created_at;

    //TODO: parse the XML file
    
    response.json(200, { message: "Message received" });
  } else {
    return response.json(400, { error: "Invalid message" });
  }
});

http.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});