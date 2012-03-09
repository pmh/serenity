var Serenity = { Object: require("./object"), Application: require('./application') };

var Controller = Serenity.Object.clone(function () {
  this.type = "Serenity.Controller";
  
  this._model_object = function () {
    return Serenity.Application[this.model];  
  };
  
  this._retrieve_template = function (name) {
    if (Serenity.Application.Templates)
      return Serenity.Application.Templates[this.type.replace("Controller", "").toLowerCase() + "/" + name];
    
    return "";
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
    this.extend(Serenity.Application[this.view], this);
    this._preloadTemplates();
    this.showTemplate('index');
  };
  
  //
  // `showTemplate` fetches and renders the specified template on to a hidden div element on the page, 
  // hides the current template and shows the new one. If there is no element to render on, it will create one automatically.
  // 
  this.showTemplate = function (tmpl, transition) {
    var view = $(this.el), template = view.find(this.el + '-' + tmpl);
    view.find('div').hide();
    if (transition === false) {
      template.show();
    } else {
      template.fadeIn();
    }
  };
  
  this._preloadTemplates = function () {
    if (Serenity.Application.Templates) {
      for (var name in Serenity.Application.Templates) {
        if (name.match(this.el.substring(1))) {
          var template = $('<div id="' + name.replace('/', '-') + '" style="left: 0; top: 0;" class="template">');
          $(this.el).append(template);
          template.html(Serenity.Application.Templates[name]);
          ko.applyBindings(this, template[0]);
        }
      };
    }
  };
});

module.exports = Controller;