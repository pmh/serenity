var Serenity = { Controller: require("./controller") };

var ArrayController = Serenity.Controller.clone(function () {
  this.type = "Serenity.ArrayController";
});

module.exports = ArrayController;