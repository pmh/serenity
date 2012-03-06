
describe ("Serenity.Object", function () {
  it ("has a type field", function () {
    expect (Serenity.Object.type). toEqual("Serenity.Object");
  });
  
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
  
  describe (".extend", function () {
    it ("copies over all the properties from one object to the receiver", function () {
      var obj1 = Serenity.Object.clone(function () { this.foo = "a foo"; })
        , obj2 = {bar: "a bar", baz: "a baz" };
      obj1.extend(obj2);
      expect (obj1.foo). toEqual ("a foo");
      expect (obj1.bar). toEqual ("a bar");
      expect (obj1.baz). toEqual ("a baz");
    });
    
    it ("invokes extended on the extended object", function () {
      var obj1 = Serenity.Object.clone(function () { this.type = "obj1"; })
        , msg  = ""
        , obj2 = { extended: function (obj) { msg += obj.type + " completes me!"; } };
      obj1.extend(obj2);
      
      expect (msg). toEqual ("obj1 completes me!");
    });
    
    it ("skips parent", function () {
      var obj1 = Serenity.Object.clone()
        , obj2 = obj1.clone();
      obj2.extend(obj1);
      
      expect (obj2.parent). toEqual (obj1);
    });
    
    it ("skips properties that begin with underscore", function () {
      var init = function () { return "initing"; }
        , obj1 = Serenity.Object.clone(init)
        , obj2 = Serenity.Object.clone();
      obj1.extend(obj2);
      
      expect (obj1._init). toNotEqual (obj2._init);
    });
  });
  
  describe (".forEach", function () {
    it ("skipps 'reserved words'", function () {
      var keys = [], obj1 = Serenity.Object.clone(function () {
        this.foo = "foo";
        this.bar = "bar";
      });
      obj1.forEach(function (key) { keys.push(key); });
      
      expect (keys). toEqual (["foo", "bar"]);
    });
    
    it ("yields both key and value", function () {
      var keys = [], obj1 = Serenity.Object.clone(function () {
        this.foo = "a foo";
        this.bar = "a bar";
      });
      obj1.forEach(function (key, value) { keys.push([key, value]); });
      
      expect (keys). toEqual ([["foo", "a foo"], ["bar", "a bar"]]);
      
    });
  });
  
  describe (".set", function () {
    it ("can be called with a name and a value", function () {
      var obj = Serenity.Object.clone()
        , res = obj.set('foo', 'bar');
      
      expect (obj.foo). toEqual ("bar");
      expect (res).     toEqual ("bar");
    });
    
    it ("can be called with an object of name/value pairs", function () {
      var obj = Serenity.Object.clone()
        , res = obj.set({foo: 'bar', baz: 'quux'});
      
      expect (obj.foo). toEqual ("bar");
      expect (obj.baz). toEqual ("quux");
      expect (res).     toEqual (obj);
    });
    
    it ("delegates to ko.observable", function () {
      spyOn(ko, 'observable').andCallThrough();
      
      var obj = Serenity.Object.clone();
      obj.set('foo', 'bar');
      obj.set({foo: 'bar', baz: 'quux'});
      
      expect (ko.observable.callCount). toEqual (3);
    });
  });
  
  describe (".computed", function () {
    it ("maps the property name to the function", function () {
      var obj = Serenity.Object.clone();
      obj.computed("foo", function () { return "computed foo"; });
      
      expect (obj.foo()). toEqual ("computed foo");
    });
    
    it ("sets a computed property on the method", function () {
      var obj = Serenity.Object.clone();
      obj.computed("foo", function () {});
      
      expect (obj.foo.computed). toBeTruthy ();
    });
    
    it ("calls bind on the method", function () {
      var obj = Serenity.Object.clone(), method = function () {};
      spyOn(method, "bind");
      obj.computed("foo", method);
      
      expect (method.bind). toHaveBeenCalledWith (obj);
    });
  });
  
  describe (".toString", function () {
    it ("contains type and slots information", function () {
      var Obj = Serenity.Object.clone(function () {
        this.type = "Obj";
        this.foo  = "a foo"; 
        this.bar  = function () {};
      });
      expect (Obj.toString()). toEqual ('<Obj @foo="a foo" @bar="method">');
    });
  });
});