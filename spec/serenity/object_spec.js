
describe ("Serenity.Object", function () {
  describe ('.clone', function () {
    it ("returns a new object", function () {
      var obj = Serenity.Object.clone();
      obj.hello = "goodbye";
      expect (obj.hello). toEqual ("goodbye");
    });
    
    it ("sets up prototypal inheritance", function () {
      var Super = Serenity.Object.clone();
      Super.awesome = true;
      var obj = Super.clone();
      expect (obj.awesome). toEqual (true);
    });
    
    it ("provides access to an objects prototype", function () {
      var Super = Serenity.Object.clone();
      Super.describe = "I'm Super!";
      var obj = Super.clone();
      obj.describe = "I'm obj!";
      expect (obj.describe       ). toEqual ("I'm obj!");
      expect (obj.parent.describe). toEqual ("I'm Super!");
    });
    
    it ("invokes the prototypes cloned: method", function () {
      var res = null;
      var Proto = Serenity.Object.clone(function () {
        this.type = "Proto";
      });
      Proto.cloned = function (sub_type) { res = [this.type, sub_type.type]; };
      var SubType = Proto.clone(function () { this.type = "SubType"; });
      expect (res). toEqual (["Proto", "SubType"]);
    });
    
    it ("takes an optional initialization block", function () {
      var Foo = Serenity.Object.clone(function () {
        this.hello = "hello";
        this.goodbye = function () {
          return "goodbye";
        };
      });
      
      expect(Foo.hello).toEqual("hello");
      expect(Foo.goodbye()).toEqual("goodbye");
    });
    
    describe ("Modifying an objects slots", function () {
      var Foo, Bar;
      
      beforeEach(function () {
        Foo = Serenity.Object.clone(function () {
          this.stuff = [];
        });
        Bar = Foo.clone();
        Bar.stuff.push("Laptop");
        Bar.stuff.push("Phone");
      });
      
      it ("updates the slot", function () {
        expect(Bar.stuff).toEqual(["Laptop", "Phone"]);
      });
      
      it ("doesn't affect it's prototype", function () {
        expect(Foo.stuff).toEqual([]);
      });
    });
  });
});