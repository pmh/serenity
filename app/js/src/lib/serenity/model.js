var Serenity = { Object: require('./object') }
  , Model    = Serenity.Object.clone();

Model.release = function() {};

module.exports = Model;