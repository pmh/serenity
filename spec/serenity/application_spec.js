
describe ("Serenity", function () {
  describe ("Application", function () {
    
    it ("acts as a namespace", function () {
      var App = Serenity.app();
      App.Foo = "Foo";
      
      expect (App.Foo). toEqual ("Foo");
    });
  });
});