describe "Pointilize", ->

  it "should require options to be passed in", ->
    p = new Pointilize
    expect( -> p.initialize()).toThrow new Error("You must pass options")

  it "should require imgSrc to be passed in", ->
    p = new Pointilize
    expect( -> p.initialize({canvas: true})).toThrow new Error("You must pass imgSrc")
