var HelloView = Serenity.View.clone(function () {
  this.template = 'hello/hello'

  this.property("greeting");

  this.init = function () {
    this.greeting = "Hello, from Serenity!";
  };
});

module.exports = HelloView;