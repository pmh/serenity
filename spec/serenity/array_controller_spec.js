
describe ("Serenity", function () {
  describe ("ArrayController", function () {
    it ("has a type", function () {
      expect (Serenity.ArrayController.type). toEqual ("Serenity.ArrayController");
    });
    
    it ("has a model collection", function () {
      var App = Serenity.app();
      App.Tasks = Serenity.ArrayController.clone();
      App.run();
      
      expect (App.Tasks.tasks). toEqual([]);;
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
      
      it ("adds the model object to it's collection", function () {
        var App = Serenity.app();
        App.Task  = { create: function () { return this; } };
        App.Tasks = Serenity.ArrayController.clone();
        App.run();
        
        App.Tasks.create();
        
        expect (App.Tasks.tasks). toEqual([App.Task]);
      });
      
      it ("resets it's model object", function () {
        var App = Serenity.app();
        App.Task  = { create: function () { return this; } };
        App.Tasks = Serenity.ArrayController.clone();
        App.run();
        App.Tasks.create();
        
        expect (App.Tasks.task). toEqual(App.Task);
        
      });
    });
  });
});