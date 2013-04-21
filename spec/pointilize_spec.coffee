describe "Pointilize", ->

  it "should require options to be passed in", ->
    expect( -> new Pointilize()).toThrow new Error("You must pass options")

  it "should require canvas to be passed in", ->
    expect( -> new Pointilize({})).toThrow new Error("You must pass canvas")

  it "should require imgSrc to be passed in", ->
    expect( -> new Pointilize({canvas: true})).toThrow new Error("You must pass imgSrc")

  it "should initialize without errors", ->
    expect( -> new Pointilize({
      canvas      : $el
      interactive : true
      imgSrc      : 'wtf'
    })).toThrow new Error("Pointilize must be called on one element")
