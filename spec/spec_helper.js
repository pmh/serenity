
global.Serenity = require('../lib/serenity');

// Mock Objects
var Empty = function () {}, Identity = function (x) { return x; };
global.ko = { observable: Identity, observableArray: Identity };