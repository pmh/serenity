
describe ("Serenity", function () {
  describe ("Model", function () {
    it ("has a type field", function () {
      expect (Serenity.Model.type). toEqual ("Serenity.Model");
    });
    
    describe (".create", function () {
      it ("returns a cloned model object", function () {
        var MyModel = Serenity.Model.clone(function () { this.stuff = []; })
          , myModel = MyModel.create();
        myModel.stuff.push(1);
        
        expect (MyModel.stuff). toEqual ([]);
        expect (myModel.stuff). toEqual ([1]);
        expect (myModel.type).  toEqual ("Serenity.Model");
      });
      
      it ("invokes the init method, passing along any arguments", function () {
        var args
          , MyModel = Serenity.Model.clone(function () {
              this.init = function (foo, bar) { args = [foo, bar]; };
            })
          , myModel = MyModel.create("foo", "bar");
        
        expect (args). toEqual (["foo", "bar"]);
      });
    });
  });
});
