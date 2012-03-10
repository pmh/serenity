var Serenity = { Controller: require("./controller") };

var ArrayController = Serenity.Controller.clone(function () {
  this.type = "Serenity.ArrayController";
  
  // 
  // `create` creates a new model object and adds it to the model collection
  // 
  this.create = function () {
    var model = this._model_object();
    this[this.type.toLowerCase()].push(model.create.apply(model, arguments));
    var modelProp = this[this.model.toLowerCase()];
    if (modelProp && modelProp.forEach) {
      modelProp.forEach(function (name, val) {
        if (val.type === "property") modelProp[name](null);
      });
    }
  };
});

module.exports = ArrayController;