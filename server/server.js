"use strict";

var express        = require('express');
var errorHandler   = require('express-error-handler');
var bodyParser     = require('body-parser');
var logger         = require('morgan');
var httpProxy      = require('http-proxy').createProxyServer();
var methodOverride = require('method-override');
var multer         = require('multer');
var path           = require('path');
var _              = require('lodash');
var app            = express();
var fs             = require('fs');
var http           = require('http').createServer(app);
var xml2Json       = require('xml2json');
var apiForwardingUrl = 'http://localhost:9001';
app.set('port', process.env.PORT || 3000);

app.use(logger('dev'));
app.use(methodOverride());
app.use(bodyParser.json()); //can associate more than 1 middleware
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(multer({dest:'./uploads'}).single('xmlschema') );
app.use(multer({storage : multer.memoryStorage() }).single('xmlschema') );
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(errorHandler({ dumpExceptions: true, showStack: true }));
}

 
app.get("/build/test",function(req,res){
  
       res.json(200, { message: "Message received" });
});
app.post("/build/parseXML", function(request, response) {
  var message = request.file;
  console.log(message);
  if(message) {
   var opts = {object:true};
   var output = xml2Json.toJson(message.buffer,opts);
    return response.json(200, output );
  } else {
    return response.json(400, { error: "Invalid message" });
  }
});

http.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});