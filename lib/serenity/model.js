var Serenity = { Object: require("./object") };

var Model = Serenity.Object.clone(function () {
  this.type = "Serenity.Model";
  
  //
  // `create` creates a new clone and if it finds an init method it invokes 
  // it in the context of the new object passing along any arguments.
  //
  this.create = function () {
    var args = arguments;
    return this.clone(function () {
      if (this.init) this.init.apply(this, args);
    });
  };
});

module.exports = Model;