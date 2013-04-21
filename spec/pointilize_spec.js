(function() {

  describe("Pointilize", function() {
    it("should require options to be passed in", function() {
      var p;
      p = new Pointilize;
      return expect(function() {
        return p.initialize();
      }).toThrow(new Error("You must pass options"));
    });
    return it("should require imgSrc to be passed in", function() {
      var p;
      p = new Pointilize;
      return expect(function() {
        return p.initialize({
          canvas: true
        });
      }).toThrow(new Error("You must pass imgSrc"));
    });
  });

}).call(this);
