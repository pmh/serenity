
global.Serenity = require('../lib/serenity');

// Mock Objects
var Empty = function () {}, Identity = function (x) { return x; };
global.ko = { observable: Identity, observableArray: Identity, applyBindings: Identity, computed: Identity };
global.$Context = { html: Identity };
global.$  = function (selector) { return global.$Context; };