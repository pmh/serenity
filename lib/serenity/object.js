var Object = {
  _reserved: function (word) {
    return word === "parent" || word.substring(0, 1) === "_";
  },
  
  clone: function (blk) {
    var proto = this, F;
    
    F = function (parent) {
      this.parent          = parent;
      this._init           = blk || function () {};
      this._before_filters = [];
      
      if (proto._init) proto._init.call(this);
      this._init.call(this);
       
      if (parent.cloned) parent.cloned(this);
    };
    
    F.prototype = proto;
    F.prototype.constructor = F;
    
    return new F(proto);
  },
  
  extend: function (obj) {
    for (var slot in obj)
      if (obj.hasOwnProperty(slot) && !this._reserved(slot)) this[slot] = obj[slot];
    
    if (obj.extended) obj.extended(this);
  },
  
  forEach: function (fn) {
    for (var slot in this)
      if (this.hasOwnProperty(slot) && !this._reserved(slot)) fn(slot, this[slot]);
  }
};

module.exports = Object;