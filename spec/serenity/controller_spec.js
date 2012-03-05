
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
    });
  });
});