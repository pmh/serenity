
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
  });
});