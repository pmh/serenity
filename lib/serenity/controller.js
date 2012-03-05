var Serenity = { Object: require("./object"), Application: require('./application') };

var Controller = Serenity.Object.clone(function () {
  this.type = "Serenity.Controller";
  
  this.create = function () {
    var model = Serenity.Application[this.model];
    model.create.apply(model, arguments);
  };
});

module.exports = Controller;