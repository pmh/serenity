var Serenity = { Object: require("./object"), Application: require('./application') };

var Controller = Serenity.Object.clone(function () {
  this.type = "Serenity.Controller";
  
  //
  // `create` locates it's model object and delegates to it's 
  // create method, passing along any arguments.
  //
  this.create = function () {
    var model = Serenity.Application[this.model];
    model.create.apply(model, arguments);
  };
});

module.exports = Controller;