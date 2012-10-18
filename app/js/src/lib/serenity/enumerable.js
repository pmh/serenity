var        _ = require('../../vendor/underscore')
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
    return _.each(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `map` returns the result of applying the iterator to each element in the collection.
  //
  this.map = function (iterator, ctx) {
    return _.map(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `reduce` builds up a single result from a list of values
  //
  this.reduce = function (iterator, memo, ctx) {
    return _.reduce(toCtx(this), toFn(iterator), memo, ctx);
  };

  //
  // `reduceRight` the right-associative version of reduce
  //
  this.reduceRight = function (iterator, memo, ctx) {
    return _.reduceRight(toCtx(this), toFn(iterator), memo, ctx);
  };

  //
  // `find` returns the first value which passes a truth test
  //
  this.find = function (iterator, ctx) {
    return _.find(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `filter` returns all the elements that pass a truth test
  //
  this.filter = function (iterator, ctx) {
    return _.filter(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `reject` returns all the elements for which a truth test fails
  //
  this.reject = function (iterator, ctx) {
    return _.reject(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `every` determines wheter all of the elements match a truth test.
  //
  this.every = function (iterator, ctx) {
    return _.every(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `every` determines if at least one of the elements match a truth test.
  //
  this.some = function (iterator, ctx) {
    return _.some(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `contains` determines if a given value is included in the array or object using ===.
  //
  this.contains = function (value) {
    return _.contains(toCtx(this), value);
  };

  //
  // `invoke` invokes a method (with arguments) on every item in a collection.
  //
  this.invoke = function (method) {
    return _.invoke.apply(_, [toCtx(this), method].concat(_.toArray(arguments).slice(1)));
  };

  //
  // `pluck` is a convenience version of a common use case of map: fetching a property.
  //
  this.pluck = function (key) {
    return _.pluck(toCtx(this), key);
  };

  //
  // `max` returns the maximum element or (element-based computation)
  //
  this.max = function (iterator, ctx) {
    return _.max(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `min` returns the minimum element or (element-based computation)
  //
  this.min = function (iterator, ctx) {
    return _.min(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `shuffle` shuffles an array using Fisher-Yates in-place O(n) shuffle
  // (implementation taken from: http://bost.ocks.org/mike/shuffle/)
  //
  this.shuffle = function () {
    var array = toCtx(this);
    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);

      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }

    return array;
  };

  //
  // `sortBy` sorts the collections values by a criterion produced by an iterator.
  //
  this.sortBy = function (iterator, ctx) {
    return _.sortBy(toCtx(this), toFn(iterator), ctx);
  };

  //
  // `groupBy` groups the objects values by a criterion.
  //
  this.groupBy = function (iterator) {
    return _.groupBy(toCtx(this), toFn(iterator));
  };

  //
  // `sortedIndex` uses a comparator function to figure out at what index an
  // object should be inserted so as to maintain order. Uses binary search.
  //
  this.sortedIndex = function (obj, iterator) {
    return _.groupBy(toCtx(this), obj, toFn(iterator));
  };

  //
  // `length` returns the number of elements in the collection.
  //
  this.length = function () {
    return toCtx(this).length;
  };

  //
  // `first` returns the first element of an array. Passing ***n** will return the first N values in the array.
  // The ***guard*** check allows it to work with map.
  //
  this.first = function (n, guard) {
    return _.first(toCtx(this), n, guard);
  };

  //
  // `initial` returns everything but the last element of an array. Passing ***n** will return all the values in
  // the array, excluding the last N. The ***guard*** check allows it to work with map.
  //
  this.initial = function (n, guard) {
    return _.initial(toCtx(this), n, guard);
  };

  //
  // `last` returns the last element of an array. Passing ***n** will return the last N values in the array.
  // The ***guard*** check allows it to work with map.
  //
  this.last = function (n, guard) {
    return _.last(toCtx(this), n, guard);
  };

  //
  // `rest` returns everything but the first element of an array. Passing ***n** will return all the values in
  // the array, starting from N. The ***guard*** check allows it to work with map.
  //
  this.rest = function (n, guard) {
    return _.rest(toCtx(this), n, guard);
  };

  //
  // `compact` filters out all falsy values from an array
  //
  this.compact = function () {
    return _.compact(toCtx(this));
  };

  //
  // `flatten` returns a completely flattened version of an array.
  //
  this.flatten = function (shallow) {
    return _.flatten(toCtx(this), shallow);
  };

  //
  // `without` return a version of the array that does not contain the specified value(s).
  //
  this.without = function () {
    return _.without.apply(_, [toCtx(this)].concat(_.toArray(arguments)));
  };

  //
  // `unique` produces a duplicate-free version of the array. If the array has already been sorted
  // you have the option of using a faster algorithm.
  //
  this.unique = function (isSorted, iterator) {
    return _.unique(toCtx(this), isSorted, iterator);
  };

  //
  // `union` produces an array that contains the union: each distinct element from all of the passed in arrays
  //
  this.union = function () {
    return _.union.apply(_, [toCtx(this)].concat(_.toArray(arguments)));
  };

  //
  // `intersection` produces an array that contains every item shared between all the passed in arrays.
  //
  this.intersection = function () {
    return _.intersection.apply(_, [toCtx(this)].concat(_.toArray(arguments)));
  };

  //
  // `difference` takes the difference between one array and a number of other arrays.
  // Only the elements present in the receiver will remain.
  //
  this.difference = function () {
    return _.difference.apply(_, [toCtx(this)].concat(_.toArray(arguments)));
  };

  //
  // `zip` zips together multiple lists into a single array -- elements that share an index go together.
  //
  this.zip = function () {
    return _.zip.apply(_, [toCtx(this)].concat(_.toArray(arguments)));
  };

  //
  // `indexOf` returns the index of an element in the array or -1 if it's not present.
  //
  this.indexOf = function (item, isSorted) {
    return _.indexOf(toCtx(this), item, isSorted);
  };

  this.lastIndexOf = function (item) {
    return _.lastIndexOf(toCtx(this), item);
  };
  /*
  this.remove = function (item) {
    var self = toCtx(this);
    self.splice(self.indexOf(item), 1);
    return self;
  };
  */
});

module.exports = Enumerable;