var Serenity = { Object: require("./object"), Application: require('./application') };

var Controller = Serenity.Object.clone(function () {
  this.type = "Serenity.Controller";
  
  this._model_object = function () {
    return Serenity.Application[this.model];  
  };
  
  this._retrieve_template = function (name) {
    return Serenity.Application.Templates[this.type.replace("Controller", "").toLowerCase() + "/" + name];
  };
  
  //
  // `create` locates it's model object and delegates to it's 
  // create method, passing along any arguments.
  // It creates a field on itself named like the model and assigns 
  // the result of calling the models create method to it.  
  //
  this.create = function () {
    var model = this._model_object();
    return this.set(this.model.toLowerCase(), model.create.apply(model, arguments));
  };
  
  //
  // `render` retrieves the index template, renders it on to the element 
  // specified in the view and applies knockout bindings.
  //
  this.render = function () {
    this.extend(Serenity.Application[this.view]);
    $(this.el).html(this._retrieve_template("index"));
    ko.applyBindings(this, $(this.el)[0]);
  };
});

module.exports = Controller;