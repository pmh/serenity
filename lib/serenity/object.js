var Object = {
  clone: function (blk) {
    var proto = this, F;
    
    F = function (parent) {
      this.parent          = parent;
      this._init           = blk || function () {};
      this._before_filters = [];
      
      if (proto._init) proto._init.call(this);
      this._init.call(this);
       
      parent.cloned(this);
    };
    
    F.prototype = proto;
    F.prototype.constructor = F;
    
    return new F(proto);
  },
  
  cloned:   function () {}
};

module.exports = Object;