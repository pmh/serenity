
describe ('Serenity', function () {
  describe ('Utils', function () {
    describe ('.extend', function () {
      it ('copies over all properties', function () {
        var myObj = {foo: 'a foo'};
        Serenity.Utils.extend(myObj, { bar: 'a bar', baz: 'a baz' });
        
        expect (myObj). toEqual ({ foo: 'a foo', bar: 'a bar', baz: 'a baz' });
      });
    });
  });
});