var Serenity = {
  Object: require('./serenity/object'),
  app:    function () { return require('./serenity/application'); }
};

module.exports = Serenity;