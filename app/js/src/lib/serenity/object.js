var _Object = {
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
      
      if (proto._init) proto._init.call(this, this);
      this._init.call(this, this);
       
      if (parent.cloned) parent.cloned(this);
    };
    
    F.prototype = proto;
    F.prototype.constructor = F;
    
    return new F(proto);
  },

  //
  // `create` clones an object and calls init with arguments.
  //
  create: function () {
    var args = arguments;
    return this.clone(function () {
      if (this.init) this.init.apply(this, args);
    });
  },
  
  //
  // `extend` copies all properties of the passed in object and installs them on it's receiver and 
  // then calls the extended hook method on that object (if one is defined) passing along the receiver
  // as an argument.
  // 
  // It can optionally take a context in wich case it will bind any method objects to that context.
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
  extend: function (obj, context) {
    for (var slot in obj)
      if (obj.hasOwnProperty(slot) && !this._reserved(slot))
        this[slot] = (context && typeof obj[slot] === "function") ? obj[slot].bind(context) : obj[slot];
    
    if (obj && obj.extended) obj.extended(this);

    return this;
  },
  
  //
  // `foreach` iterates over an object invoking the passed in function for it's side effects for every property.
  //
  forEach: function (fn) {
    for (var slot in this)
      if (this.hasOwnProperty(slot) && !this._reserved(slot)) fn.call(this, slot, this[slot]);
  },
  
  // Defines one or more ko.observable properties on `this`.
  set: function (obj) {
    for (var key in obj) {
      var isArray = Object.prototype.toString.apply(obj[key]).match(/Array/);
      this[key] = isArray ? ko.observableArray(obj[key]) : ko.observable(obj[key]);
    }
  },
  
  // Defines one or more ko.observable properties on `this` and creates a getter and setter for each.
  // You can access the original value through _propName.
  // Aliased as properties
  property: function () {
    var i, len = arguments.length;
    for (i = 0; i < len; i++) {
      this._defineProperty(arguments[i]);
    }
  },
  
  _defineProperty: function (prop) {
    var self = this;
    this["_" + prop] = ko.observable();
    
    this.__defineGetter__(prop, function () {
      if (self['_' + prop]() === undefined) return null;
      return self['_' + prop]();
    });
    
    this.__defineSetter__(prop, function (val) {
      if (this["_" + prop]() === undefined) {
        var isArray = Object.prototype.toString.apply(val).match(/Array/);
        if (isArray) self["_" + prop] = ko.observableArray(val);
        else self["_" + prop](val);
      } else {
        self['_' + prop](val);
      }
    });
  },
  
  // Alias for property
  properties: function () {
    this.property.apply(this, arguments);
  },
  
  //
  // `before` takes the name of a function and a callback and will invoke the
  // callback before the original method is invoked.
  // 
  //     var foo = { bar: function () { console.log('bar') } };
  //     foo.before('bar', function () { console.log('before bar') });
  //    
  //     foo.bar(); //=> "before bar"
  //                     "bar"
  //
  before: function (original, cb) {
    var __orig = this[original];
    this[original] = function () {
      cb.call(this);
      __orig.apply(this, arguments);
    };
  },
  
  //
  // `around` takes the name of a function and a callback and will invoke the
  // callback passing a partially applied version of the original as the first argument.
  // 
  //     var foo = { bar: function () { console.log('bar') } };
  //     foo.around('bar', function (yield) {
  //       console.log('before bar');
  //       yield();
  //       console.log('after bar');
  //     });
  //     
  //     foo.bar(); //=> "before bar"
  //                     "bar"
  //                     "after bar"
  //
  //
  around: function (original, cb) {
    var __orig = this[original];
    this[original] = function () {
      var args = arguments;
      cb.call(this, function () { return __orig.apply(this, args); }.bind(this));
    };
  },
  
  //
  // `after` takes the name of a function and a callback and will invoke the
  // callback after the original method is invoked.
  // 
  //     var foo = { bar: function () { console.log('bar') } };
  //     foo.after('bar', function () { console.log('after bar') });
  //     
  //     foo.bar(); //=> "bar"
  //                     "after bar"
  //
  after: function (original, cb) {
    var __orig = this[original];
    this[original] = function () {
      __orig.apply(this, arguments);
      cb.call(this);
    };
  },
  
  //
  // `subscribe` takes the name of a property and a callback function to invoke
  // whenever it changes. It delegates to ko.obsarvable's subscribe method.
  // 
  //     MyObj.subscribe('foo', function () { ... });
  //
  subscribe: function (name, fn) {
    this["_" + name].subscribe(fn);
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

module.exports = _Object;