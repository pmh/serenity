var express     = require('express')
  , app         = express.createServer()
  , io          = require('socket.io').listen(app)
  , fs          = require("fs")
  , fileWatcher = require("./file_watcher")
  , templates   = require("./template_compiler")
  , modulr      = require('./modulr')
  , exec        = require('child_process').exec
  , events      = require('events')
  , reloader    = new events.EventEmitter();
  ;

io.sockets.on('connection', function (socket) {
  reloader.on("reload-js", function (file) {
    socket.emit("reload-js", file);
  });

  reloader.on("reload-css", function (file) {
    socket.emit("reload-css", file);
  });

  reloader.on("reload-html", function (file) {
    socket.emit("reload-html", file);
  });
});

app.configure('development', function() {
  app.use(express.static(__dirname + '/../app/'));
});

app.get("/docco.css", function (req, res) {
  fs.readFile(__dirname + '/node_modules/docco/resources/docco.css', 'utf8', function(err, text){
    res.send(text);
  });
});

app.get("/docs", function (req, res) {
  fs.readFile(__dirname + '/../docs/object.html', 'utf8', function(err, text){
        res.send(text);
    });
});

fileWatcher.watch({
  
  js: function (path) {
    if (path.match(/(\/|\\)src(\/|\\)/)) {
      console.log('detected change in:', path + ', reloading...');
      modulr.compile('app/js/src/', 'dev', function () {
        reloader.emit('reload-js', 'js/main.js');
      });
    }
  },
    
  css: function (path) {
    reloader.emit('reload-css', 'css/screen.css');
  },
  
  scss: function (path) {
    console.log('detected change in:', path + ', reloading...');
    exec('compass compile', function (err, out) {
      console.log(out);
    });
  },
  
  html: function (path) {
    console.log('detected change in:', path + ', reloading...');
    templates.compile();
    reloader.emit('reload-html', path);
  }
});

app.listen('3000');