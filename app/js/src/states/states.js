var machina = require( '../vendor/machina' );

var states  = new machina.Fsm({
  messaging: {
    provider         : "postal",
    eventNamespace   : "application.events",
    handlerNamespace : "application"
  },

  initialState: "uninitialized",

  states: {
    uninitialized: {
      initialize: function() {
        // Initialize application.
        $("#splash").hide();
        require("views/hello_view").display();
      },
    },
  }
});

module.exports = states;