
describe ("Inflector", function () {
  describe (".pluralize", function () {
    it ("pluralizes a word", function () {
      expect ( Serenity.Inflector.pluralize("octopus") ). toEqual( "octopi" );
      expect ( Serenity.Inflector.pluralize("person")  ). toEqual( "people" );
      expect ( Serenity.Inflector.pluralize("task")    ). toEqual( "tasks"  );
    });
    
    it ("preserves case", function () {
      expect ( Serenity.Inflector.pluralize("Octopus") ). toEqual( "Octopi" );
      expect ( Serenity.Inflector.pluralize("Person")  ). toEqual( "People" );
      expect ( Serenity.Inflector.pluralize("Task")    ). toEqual( "Tasks"  );
    });
    
    it ("accepts an override", function () {
      expect ( Serenity.Inflector.pluralize("person", "guys") ). toEqual( "guys" );
    
    });
  });
  
  describe (".singularize", function () {
    it ("singularizes a word", function () {
      expect ( Serenity.Inflector.singularize("octopi")  ). toEqual( "octopus" );
      expect ( Serenity.Inflector.singularize("people")  ). toEqual( "person"  );
      expect ( Serenity.Inflector.singularize("tasks")   ). toEqual( "task"    );
    });
    
    it ("preserves case", function () {
      expect ( Serenity.Inflector.singularize("Octopi") ). toEqual( "Octopus" );
      expect ( Serenity.Inflector.singularize("People") ). toEqual( "Person" );
      expect ( Serenity.Inflector.singularize("Tasks")  ). toEqual( "Task"  );
    });
    
    it ("accepts an override", function () {
      expect ( Serenity.Inflector.singularize("people", "guy") ). toEqual( "guy" );
    });
  });
});