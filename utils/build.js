var fs          = require("fs")
  , templates   = require("./template_compiler")
  , modulr      = require('./modulr')
  , exec        = require('child_process').exec
  ;

var env = process.argv.slice(2)[0] || "dev";

modulr.compile('app/js/src/', env);
templates.compile();
if (env === "prod") {
  exec('compass compile -c config_prod.rb --force', function (err, out) {
    if (err) throw err;
  });
} else {
  exec('compass compile', function (err, out) {
    if (err) throw err;
    
    console.log(out);
  });
}