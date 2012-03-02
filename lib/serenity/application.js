var Serenity = { Object: require("./object") };

var Application = Serenity.Object.clone(function () {
  this._resolve_types = function () {
    if (this.forEach) {
      this.forEach(function (name, obj) {
        if (name.substring(0, 1).match(/[A-Z]/)) {
          obj.type = name;
          Application._resolve_types.call(obj);
        }
      });
    }
  };
});

module.exports = Application;