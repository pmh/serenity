require('./vendor/string-lambda');
// **Serenity** is a JavaScript MVC framework built on top of KnockoutJS.
// It uses convention over configuration and data-binding to 
// eliminate boilerplate and help structure your applications.
var Serenity = {
  
  // **Serenity.Object**
  // This is the prototype of all other objects in Serenity and forms the base of it's object system.
  Object          : require('./serenity/object'),
  
  // **Serenity.Controller**
  // This is the prototype of all controller objects in Serenity.
  Controller      : require('./serenity/controller'),
  
  // **Serenity.ArrayController**
  // This is a specialized controller object responsible for managing a collection of model objects.
  ArrayController : require('./serenity/array_controller'),
  
  // **Serenity.Model**
  // This is the prototype of all model objects in Serenity.
  Model           : require('./serenity/model'),
  
  // **Serenity.View**
  // This is the prototype of all view objects responsible for encapsulationg dom related logic.
  View            : require('./serenity/view'),
  
  // **Serenity.Inflector**
  // Provides facilities to convert words between it's singular and plural form. 
  Inflector       : require('./serenity/inflector'),
  
  // **Serenity.Enumerable**
  // Provides an enumerable interface for your objects
  Enumerable      : require('./serenity/enumerable'),
  
  // **Serenity.app**
  // The main entry point for all Serenity applications.
  app             : function () { return require('./serenity/application'); }
};

module.exports = Serenity;