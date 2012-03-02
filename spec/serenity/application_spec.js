
describe ("Serenity", function () {
  describe ("Application", function () {
    
    it ("acts as a namespace", function () {
      var App = Serenity.app();
      App.Foo = "Foo";
      
      expect (App.Foo). toEqual ("Foo");
    });
    
    describe ("._resolve_types", function () {
      it ("can resolve simple types", function () {
        var App = Serenity.app();
        App.Foo = Serenity.Object.clone(); App.Bar = Serenity.Object.clone(), App.Bar.Baz = Serenity.Object.clone();
        App._resolve_types();
        
        expect ( App.Foo.type     ). toEqual ("Foo");
        expect ( App.Bar.type     ). toEqual ("Bar");
      });
      
      it ("can resolve nested types", function () {
        var App = Serenity.app();
        App.Foo = Serenity.Object.clone(); App.Foo.Bar = Serenity.Object.clone(), App.Foo.Bar.Baz = Serenity.Object.clone();
        App._resolve_types();
        
        expect ( App.Foo.Bar.type     ). toEqual ("Bar");
        expect ( App.Foo.Bar.Baz.type ). toEqual ("Baz");
      });
    });
  });
});