beforeEach ->
  # Add a div to hold html elements
  $("<canvas>").appendTo('body')
  window.$el = $('canvas')

afterEach ->
  $('canvas').remove()
