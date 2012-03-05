var Object = {
  //
  //  `_reserved` determines wether a certain word is reserved or not.
  // Reserved words are ignored when iterating over an object.
  //
  _reserved: function (word) {
    return word === "parent" || word === "type" || word.substring(0, 1) === "_";
  },
  
  //
  // Every Serenity.Object has a type field to aid in debbugging and also to enforce conventions.
  //
  type: "Serenity.Object",
  
  //
  // `clone` is the corner stone of the Serenity object model. You could think of it as an 
  // object factory somewhat akin to Object.create but more powerful.
  // When called it produces a new object who's prototype is the receiver of the clone message, 
  // it then invokes the passed in function in the context of this newly created object.
  // It also adds a parent property to each object which points to it's prototype.
  //
  // One thing to note about Serenity's object model is that your always working with objects
  // and there's no concept of classes so there's no distinction between class level (i.e., static proprties)
  // and instance level properties.
  // 
  //     // Creates a new object whose prototype is Object and
  //     // assigns it to 'MyObj'
  //     var MyObj = Object.clone(function () { this.stuff = [] });
  //     
  //     // Creates a new object whose prototype is MyObj and 
  //     // assigns it to 'myObj'
  //     var myObj = MyObj.clone();
  //     
  //     myObj.stuff.push(1);
  //     myObj.stuff;           //=> [1]
  //     myObj.parent.stuff;    //=> []
  //
  clone: function (blk) {
    var proto = this, F;
    
    F = function (parent) {
      this.parent          = parent;
      this._init           = blk || function () {};
      this._before_filters = [];
      
      if (proto._init) proto._init.call(this);
      this._init.call(this);
       
      if (parent.cloned) parent.cloned(this);
    };
    
    F.prototype = proto;
    F.prototype.constructor = F;
    
    return new F(proto);
  },
  
  //
  // `extend` copies all properties of the passed in object and installs them on it's receiver and 
  // then calls the extended hook method on that object (if one is defined) passing along the receiver
  // as an argument.
  // 
  //     var Foo = {
  //       extended: function (obj) {
  //         console.log("I will be called if someone extends me!")
  //       },
  //       foo: "bar"
  //     };
  //     
  //     var Bar = Serenity.Object.clone();
  // 
  //     Bar.foo           //=> undefined
  //     
  //     Bar.extend(Foo);  //=> "I will be called if someone extends me!"
  //     
  //     Bar.foo           //=> "bar"
  //
  extend: function (obj) {
    for (var slot in obj)
      if (obj.hasOwnProperty(slot) && !this._reserved(slot)) this[slot] = obj[slot];
    
    if (obj && obj.extended) obj.extended(this);
  },
  
  //
  // `foreach` iterates over an object invoking the passed in function for it's side effects for every property.
  //
  forEach: function (fn) {
    for (var slot in this)
      if (this.hasOwnProperty(slot) && !this._reserved(slot)) fn.call(this, slot, this[slot]);
  },
  
  //
  // `set` let's you set properties on your object's and you should prefer using it rather than setting properies driectly.
  // The reason for this is that when you use `set` it will make your propery obsevable allowing listeners (like your views)
  // automatically react to any changes to it.
  // You can call `set` in two ways, you either call it with two arguments where the first is the name of the property and 
  // the other one is the value to set it to, or you call it with an object of key/value pairs.
  // 
  //     var myObj = Serenity.Object.clone();
  //     
  //     myObj.set("foo", 123);
  //     myObj.set({bar: 321, baz: 456});
  //
  set: function (name, val) {
    if (name.substring) {
      return this[name] = ko.observable(val);
    } else {
      var obj = name;
      for (var k in obj) {
        this[k] = ko.observable(obj[k]);
      };
      return this;
    }
  },
  
  //
  // `toString` returns a textual representation of your objects.
  // It tries it's best to provide as detailed information as possible, including the objects type and attributes.
  //
  //     Serenity.Object.toString()
  //           //=> <Serenity.Object @extend="method" @set="method" ...>
  //
  toString: function () {
    var str = "<" + this.type + " ";
    this.forEach(function (slot) { 
      str += '@' + slot + '=';
      str += typeof this[slot] === "function" ? '"method"' : '"' + this[slot] + '"';
      str += " ";
    });
    return str.trim() + ">";
  }
};

module.exports = Object;