var _ = require('../vendor/underscore')
  , Serenity = { Object: require('./object') };

//
// **Serenity.Enumerable** brings the underscore.js enumerable methods to your own objects.
//
var Enumerable = Serenity.Object.clone(function () {
  var toFn  = function (iterator) { return iterator.lambda ? iterator.lambda() : iterator; },
      toCtx = function (ctx)      { return typeof ctx === 'function' ? ctx() : ctx;        };
  
  //
  // `each` applies the iterator for it's side-effects for every element in the collection.
  //
  this.each = function (iterator, ctx) {
    _.each(toCtx(this), toFn(iterator), ctx);
  };
});

module.exports = Enumerable;