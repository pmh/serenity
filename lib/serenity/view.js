var Serenity = { Object: require('./object') };

var View = Serenity.Object.clone(function () {
  this.type = "Serenity.View";
});

module.exports = View;