require('../../../vendor/string-lambda');

var Enumerable = require('../enumerable');

Function.prototype.computed = function (ctx) {
  var self = this;
  return function() {return ctx ? ko.computed(self, ctx) : ko.computed(self);};
};

Function.prototype.withMeta = function (metaData) {
  for (var slot in metaData)
    if (metaData.hasOwnProperty(slot))
      this[slot] = metaData[slot];

  return this;
}

Array.prototype.each = Enumerable.each;

if (!Array.prototype.map) {
  Array.prototype.map = Enumerable.map;
};

if (!Array.prototype.reduce) {
  Array.prototype.reduce = Enumerable.reduce;
};

if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = Enumerable.reduceRight;
};

if (!Array.prototype.find) {
  Array.prototype.find = Enumerable.find;
};

if (!Array.prototype.filter) {
  Array.prototype.filter = Enumerable.filter;
};

if (!Array.prototype.reject) {
  Array.prototype.reject = Enumerable.reject;
};

if (!Array.prototype.every) {
  Array.prototype.every = Enumerable.every;
};

if (!Array.prototype.some) {
  Array.prototype.some = Enumerable.some;
};

if (!Array.prototype.contains) {
  Array.prototype.contains = Enumerable.contains;
};

if (!Array.prototype.invoke) {
  Array.prototype.invoke = Enumerable.invoke;
};

if (!Array.prototype.pluck) {
  Array.prototype.pluck = Enumerable.pluck;
};

if (!Array.prototype.max) {
  Array.prototype.max = Enumerable.max;
};

if (!Array.prototype.min) {
  Array.prototype.min = Enumerable.min;
};

if (!Array.prototype.shuffle) {
  Array.prototype.shuffle = Enumerable.shuffle;
};

if (!Array.prototype.sortBy) {
  Array.prototype.sortBy = Enumerable.sortBy;
};

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = Enumerable.groupBy;
};

if (!Array.prototype.sortedIndex) {
  Array.prototype.sortedIndex = Enumerable.sortedIndex;
};

if (!Array.prototype.first) {
  Array.prototype.first = Enumerable.first;
};

if (!Array.prototype.initial) {
  Array.prototype.initial = Enumerable.initial;
};

if (!Array.prototype.last) {
  Array.prototype.last = Enumerable.last;
};

if (!Array.prototype.rest) {
  Array.prototype.rest = Enumerable.rest;
};

if (!Array.prototype.compact) {
  Array.prototype.compact = Enumerable.compact;
};

if (!Array.prototype.flatten) {
  Array.prototype.flatten = Enumerable.flatten;
};

if (!Array.prototype.without) {
  Array.prototype.without = Enumerable.without;
};

if (!Array.prototype.unique) {
  Array.prototype.unique = Enumerable.unique;
};

if (!Array.prototype.union) {
  Array.prototype.union = Enumerable.union;
};

if (!Array.prototype.intersection) {
  Array.prototype.intersection = Enumerable.intersection;
};

if (!Array.prototype.difference) {
  Array.prototype.difference = Enumerable.difference;
};

if (!Array.prototype.zip) {
  Array.prototype.zip = Enumerable.zip;
};

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = Enumerable.indexOf;
};

if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = Enumerable.lastIndexOf;
};

if (!Array.prototype.remove) {
  Array.prototype.remove = Enumerable.remove;
};

Object["merge"] = function (target) {
  var args = Array.prototype.slice.call(arguments).slice(1);
  args.each(function (source) {
    for (var key in source)
      target[key] = source[key];
  });

  return target;
};