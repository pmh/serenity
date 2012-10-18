var Serenity   = { Object: require('./object') }
  , Controller = Serenity.Object.clone();

Controller.model = function() {};
Controller.release = function() {};

Controller.type = "Controller"

module.exports = Controller;
