(function() {

  describe("Pointilize", function() {
    it("should require canvas to be passed in", function() {
      return expect(function() {
        return new Pointilize();
      }).toThrow(new Error("You must pass canvas"));
    });
    it("should require canvas to be passed in", function() {
      return expect(function() {
        return new Pointilize({});
      }).toThrow(new Error("You must pass canvas"));
    });
    it("should require imgSrc to be passed in", function() {
      return expect(function() {
        return new Pointilize({
          canvas: true
        });
      }).toThrow(new Error("You must pass imgSrc"));
    });
    return it("should initialize without errors", function() {
      return expect(function() {
        return new Pointilize({
          canvas: $el,
          interactive: true,
          imgSrc: 'wtf'
        });
      }).toThrow(new Error("Pointilize must be called on one element"));
    });
  });

}).call(this);
