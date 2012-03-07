
describe ("Serenity", function () {
  describe ("Application", function () {
    
    it ("acts as a namespace", function () {
      var App = Serenity.app();
      App.Foo = "Foo";
      
      expect (App.Foo). toEqual ("Foo");
    });
    
    describe (".run", function () {
      it ("resolves top level types", function () {
        var App = Serenity.app();
        App.Foo = Serenity.Object.clone(); App.Bar = Serenity.Object.clone(), App.Bar.Baz = Serenity.Object.clone();
        App.run();
        
        expect ( App.Foo.type     ). toEqual ("Foo");
        expect ( App.Bar.type     ). toEqual ("Bar");
      });
      
      it ("resolves nested types", function () {
        var App = Serenity.app();
        App.Foo = Serenity.Object.clone(); App.Foo.Bar = Serenity.Object.clone(), App.Foo.Bar.Baz = Serenity.Object.clone();
        App.run();
        
        expect ( App.Foo.Bar.type     ). toEqual ("Bar");
        expect ( App.Foo.Bar.Baz.type ). toEqual ("Baz");
      });
      
      it ("sets the model property on controller objects", function () {
        var App = Serenity.app();
        App.Tasks = Serenity.ArrayController.clone();
        App.run();
        
        expect (App.Tasks.model). toEqual ("Task");
      });
      
      it ("strips away Controller part from name if there is one", function () {
        var App = Serenity.app();
        App.TaskController = Serenity.Controller.clone();
        App.run();
        
        expect (App.TaskController.model). toEqual ("Task");
      });
      
      it ("wont set the model property if it's already set", function () {
        var App = Serenity.app();
        App.Tasks = Serenity.ArrayController.clone(function () { this.model = "MyTask"; });
        App.run();
        
        expect (App.Tasks.model). toEqual ("MyTask");
      });
      
      it ("sets the view property on controller objects", function () {
        var App = Serenity.app();
        App.Tasks = Serenity.ArrayController.clone();
        App.run();
        
        expect (App.Tasks.view). toEqual ("TaskView");
      });
      
      it ("wont set the view property if it's already set", function () {
        var App = Serenity.app();
        App.Tasks = Serenity.ArrayController.clone(function () { this.view = "MyTaskView"; });
        App.run();
        
        expect (App.Tasks.view). toEqual ("MyTaskView");
      });
      
      it ("sets a collection property on array controller objects", function () {
        var App = Serenity.app();
        App.Tasks = Serenity.ArrayController.clone();
        App.run();
        
        expect (App.Tasks.tasks). toEqual ([]);
      });
      
      it ("wraps computed methods with ko.computed", function () {
        var App = Serenity.app();
        App.TaskController = Serenity.Controller.clone(function () {
          this.computed('foo', function () {});
        });
        spyOn(ko, "computed");
        App.run();
        
        expect (ko.computed). toHaveBeenCalledWith (App.TaskController.foo);
      });
    });
  });
});