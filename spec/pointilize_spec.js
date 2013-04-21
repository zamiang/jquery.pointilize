(function() {

  describe("Pointilize", function() {
    it("should require options to be passed in", function() {
      return expect(function() {
        return new Pointilize();
      }).toThrow(new Error("You must pass options"));
    });
    return it("should require imgSrc to be passed in", function() {
      return expect(function() {
        return new Pointilize({
          canvas: true
        });
      }).toThrow(new Error("You must pass imgSrc"));
    });
  });

}).call(this);
