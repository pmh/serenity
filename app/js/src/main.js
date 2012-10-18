window.ko = require('./vendor/knockout-debug');
require('./vendor/jquery-transition');

window.Templates = require('./templates');
window.Serenity  = require('./lib/serenity');
window._         = require('./vendor/underscore');

require('./vendor/postal');
require("./states/states");

setTimeout(function () {
  postal.publish("application", "initialize", {});
}, 3000);