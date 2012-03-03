var Serenity = {
  Object:     require('./serenity/object'),
  Controller: require('./serenity/controller'),
  app:        function () { return require('./serenity/application'); }
};

module.exports = Serenity;