var Serenity = { Object: require("./object"), Inflector: require('./inflector') };

var Application = Serenity.Object.clone(function () {
  this._resolve_type = function (name, obj) {
    if (name.substring(0, 1).match(/[A-Z]/)) obj.type = name;
  };
  
  this._traverse = function (fn) {
    if (this.forEach) {
      this.forEach(function (name, obj) {
        fn(name, obj);
        Application._traverse.call(obj, fn);
      });
    }
  };
  
  this._configure_controller = function (name, obj) {
    name = name.replace("Controller", "");
    if (obj.type && obj.type.match(/Controller$/)) {
      if (!obj.model)
        obj.model = Serenity.Inflector.singularize(name);
      
      if (!obj.view)
        obj.view = Serenity.Inflector.singularize(name) + "View";
    }
    if (obj.type && obj.type.match(/ArrayController$/))
      obj[name.toLowerCase()] = ko.observableArray([]);
  };
  
  this._configure_view = function (name, obj) {
    if (name.match(/View$/)) {
      if (!obj.el)
        obj.el = "#" + Serenity.Inflector.pluralize(name.replace("View", "").toLowerCase());
    }
  };
  
  this._wrap_computeds = function (name, obj) {
    if (obj.computed && typeof obj === "function") obj[name] = ko.computed(obj);
  };
  
  this._render = function (_, obj) {
    if (obj.parent && obj.parent.type.match(/Controller$/)) obj.render();
  };
  
  // 
  // `run` recursively walks the Application object and for each step it
  // sets the model, view and collection attributes on controller objects and resolves
  // the type of each 'constant' property.
  // 
  this.run = function () {
    this._traverse(function (name, obj) {
      if (obj) {
        Application._configure_controller(name, obj);
        Application._configure_view(name, obj);
        Application._resolve_type(name, obj);
        Application._wrap_computeds(name, obj);
        Application._render(name, obj);
      }
    });
  };
});

module.exports = Application;