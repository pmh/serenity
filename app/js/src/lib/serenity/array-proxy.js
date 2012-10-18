var MVC, ArrayProxy;

MVC = {
  Controller: require('./controller'),
  Enumerable: require('./enumerable')
};

ArrayProxy = MVC.Controller.clone(function () {
  this.properties('collection', 'selectedItem');
  this.collection = [];
  
  this.extend(MVC.Enumerable, this._collection);
	
	this.type = "ArrayProxy";
});

ArrayProxy.push = function (obj) {
  this._collection.push(obj);
};

ArrayProxy.remove = function (obj) {
  this._collection.remove(obj);
};

ArrayProxy.removeAll = function () {
  this._collection.removeAll();
};

ArrayProxy.pop = function () {
  this._collection.pop();
};

ArrayProxy.unshift = function (obj) {
  this._collection.unshift(obj);
};

ArrayProxy.reverse = function () {
  this._collection.reverse();
};

ArrayProxy.sort = function (fn) {
  this._collection.sort(fn);
};

ArrayProxy.splice = function (start, end) {
  this._collection.splice(start, end);
};

module.exports = ArrayProxy;