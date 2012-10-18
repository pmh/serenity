var Serenity  = { Object: require('./object'), Templates: require('../../templates') }
  , View = Serenity.Object.clone();

View.create = function (config) {
  return this.clone(function () {
    this.init(config);
    if (config.init) config.init.call(this);
  });
};

View.cloned = function (view) {
  view.init.call(view);
  
  if (view.controller) {
    view.controller.model = view.model;
    view.controller.view  = view;
    if (view.controller.init) view.controller.init();
  }
};

View.init = function (config) {
  this.extend(config);
  
  if (this.controller) {
    this.controller.model = this.model;
    this.controller.view  = this;
  }
};


View.display = function () {
  var tmpl = $('div[data-template-path="' + this.template + '"]');
  tmpl.css(this.styles || {});
  //tmpl.css('opacity', '1');
  tmpl.html(Serenity.Templates[this.template]);
  ko.applyBindings(this, tmpl[0]);
  tmpl.css('display', 'block');
  this.send('subviews', 'display');

  if (this.animateTransition) {
    tmpl.css('opacity', '0');
    tmpl.animate({opacity: 1}, 200, 'linear');
  }
  postal.channel("View." + this.template, "afterDisplay").publish();

  return this;
};

View.send = function (coll, message) {
  this[coll] = this[coll] || [];
  
  var i, len = this[coll].length;
  for (i = 0; i < len; i++) this[coll][i][message]();
};

View._cleanNode = function() {
  var tmpl = $('div[data-template-path="' + this.template + '"]');
  ko.cleanNode(tmpl[0]);
}

View.release = function () {
  var tmpl = $('div[data-template-path="' + this.template + '"]');
  
  this.send('subviews', '_cleanNode');
  this._cleanNode();

  if (this.animateTransition) {
    tmpl.animate({opacity: 0}, 200, 'linear', function() {
        tmpl.hide();
        tmpl.empty();
      }
    );
  }
  else {
    tmpl.empty();
    tmpl.hide();
  }
  //tmpl.html("");
  /*tmpl.css('opacity', '0');
  tmpl.hide();*/

  if (this.controller) {
    this.controller.release();
  }
  if (this.model) {
    this.model.release();
  }
  this.send('subviews', 'release');
  
  

  return this;
};

module.exports = View;