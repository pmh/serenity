
describe ("Serenity", function () {
  describe ("Controller", function () {
    it ("has a type field", function () {
      expect (Serenity.Controller.type). toEqual ("Serenity.Controller");
    });
    
    describe (".create", function () {
      it ("delegates to the model's create method", function () {
        var App = Serenity.app();
        App.Task  = { create: function () {} };
        App.Tasks = Serenity.ArrayController.clone();
        App.run();
        spyOn(App.Task, 'create');
        
        App.Tasks.create("foo");
        
        expect (App.Task.create). toHaveBeenCalledWith("foo");
      });
      
      it ("sets the created model object as a property named like the model", function () {
        var App = Serenity.app();
        App.Task  = { create: function () { return this; } };
        App.Tasks = Serenity.Controller.clone();
        App.run();
        
        var model = App.Tasks.create();
        
        expect (App.Tasks.task). toEqual(App.Task);
      });
      
      it ("returns the model object", function () {
        var App = Serenity.app();
        App.Task  = { create: function () { return this; } };
        App.Tasks = Serenity.Controller.clone();
        App.run();
        
        var model = App.Tasks.create();
        
        expect (model). toEqual(App.Task);
      });
    });
    
    describe (".render", function () {
      it ("retrieves the index template, renders it onto this.el and applies bindings", function () {
        var App = Serenity.app();
        App.Templates = { 'tasks/index': "tasks/index template" };
        App.Tasks     = Serenity.ArrayController.clone();
        App.TaskView  = Serenity.View.clone(function () { this.el = "foo"; });
        App.run();
        
        spyOn( App.Tasks, 'extend'         ).andCallThrough();
        spyOn( App.Tasks, 'renderTemplate' );
        spyOn( ko       , 'applyBindings'  ).andCallThrough();
        
        App.Tasks.render();
        expect ( App.Tasks.extend         ).toHaveBeenCalledWith(App[App.Tasks.view], App.Tasks);
        expect ( App.Tasks.renderTemplate ).toHaveBeenCalledWith('index');
        expect ( ko.applyBindings         ).toHaveBeenCalled();
      });
    });
  });
});