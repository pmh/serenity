// **Serenity** is a JavaScript MVC framework built on top of KnockoutJS.
// It makes heavy use of convention over configuration and data-binding to 
// eliminate boilerplate and help structure your applications.
var Serenity = {
  Object:     require('./serenity/object'),
  Controller: require('./serenity/controller'),
  app:        function () { return require('./serenity/application'); }
};

module.exports = Serenity;