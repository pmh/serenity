var fs = require("fs");

var self = this;
var reloader;

module.exports = {
  compile: function (projectPath, env, done) {
    env = env || 'dev';
    require('modulr').build('main', {
      root:               projectPath,
      minify:             false, // TODO: Minification currently don't work
      resolveIdentifiers: true,
      allowDirModules:    true,
      environment:        env
    }, function (err, result) {
      if(err){
        console.error("compile errror: " + err);
      }
      var path, res;
      result = result || {output: ""};
      if (env === "prod") {
        path = 'build/js/main.js';
        res  = result.output;//.replace(/console\.(log|error|warning)\(.*\)\;?/g, '');
      } else {
        path = 'app/js/main.js';
        res  = result.output += ("\n$(function () { $('head').append($('<script src=\"js/src/vendor/socket.js\"></script>')); $('head').append($('<script src=\"js/src/vendor/livereload.js\"></script>'));});");
      }
      fs.writeFile(path, err ? renderError(err) : res, 'utf8', (done || function () {}));
    });
  }
};

var renderError = function (err) {
 return require("fs").readFileSync("app/js/main.js", "utf8") + 
   'document.write(\'<div style="z-index: 400; background-color: #FF5454; position: absolute; left: 0; right:0; top:0; padding: 20px; text-align: center;">' + 
     err.longDesc.replace(/\n/g, ' ') + 
     '</div>\');\nconsole.error("' + err.longDesc.replace(/\n/g, ' ') + '")';
};