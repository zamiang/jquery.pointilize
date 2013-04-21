describe "Pointilize", ->

  it "should require options to be passed in", ->
    expect( -> new Pointilize()).toThrow new Error("You must pass options")

  it "should require imgSrc to be passed in", ->
    expect( -> new Pointilize({canvas: true})).toThrow new Error("You must pass imgSrc")
