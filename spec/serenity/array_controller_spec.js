
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
  });
});