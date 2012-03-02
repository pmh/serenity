var Serenity = { Object: require("./object") };

var Application = Serenity.Object.clone(function () {
  this._resolve_types = function () {
    this._traverse(function (name, obj) {
      if (name.substring(0, 1).match(/[A-Z]/)) obj.type = name;
    });
  };
  
  this._traverse = function (fn) {
    if (this.forEach) {
      this.forEach(function (name, obj) {
        fn(name, obj);
        Application._traverse.call(obj, fn);
      });
    }
  };
});

module.exports = Application;