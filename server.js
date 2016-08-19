let http    = require('http');
let express = require('express');
let path    = require('path');
let favicon = require('serve-favicon');
let logger  = require('morgan');
let port    = process.env.PORT || 3000;
let server  = express();



// view engine setup
//server.set('view engine', 'ejs');
//server.set('views', path.join(__dirname,'views'));
server.use(express.static(path.join(__dirname, 'app')));
server.use('/uploads',express.static(path.join(__dirname, 'uploads')));
server.use('/vendor', express.static(path.join(__dirname, 'bower_components')));

// uncomment after placing your favicon in /public
//server.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
server.use(logger('dev'));

server.get('/*', (req, res) => res.sendFile(path.join(__dirname, 'index.html'))/*res.render('index')*/);


// catch 404 and forward to error handler
server.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

server.use((req, res, next) => {
  res.status(err.status || 500);
  res.send(err);
});

server.set('port', port);
let httpServer = http.createServer(server);
httpServer.listen(port);
console.log('Server started at http://localhost:' + port);

module.exports = httpServer;
