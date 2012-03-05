var Serenity = { Object: require("./object") };

var Model = Serenity.Object.clone(function () {
  this.type = "Serenity.Model";
});

module.exports = Model;