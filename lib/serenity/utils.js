var _        = require('../vendor/underscore')
  , Serenity = { Object: require('./object') };

var Utils = Serenity.Object.clone(function () {
  // 
  // `extend` copies all of the properties in the source objects over 
  // to the destination object. It's in-order, so the last source will 
  // override properties of the same name in previous arguments.
  // 
  this.extend = function (destination, sources) {
    _.extend.apply(this, arguments);
  };
});

module.exports = Utils;