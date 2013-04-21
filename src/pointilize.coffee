# pointilize.js
# https://github.com/zamiang/pointilize
#
# Pointilizes an image using html5 canvas
# Takes an image and draws every #cellSize pixel. 
# the user can rollover the image to draw in the additional pixels
#
# Copyright (c) 2013 Brennan Moore
# Licensed under the MIT license.

class Pointilize

  mouse:
    x: -1
    y: -1

  cellSize: 5
  brushSize: 2
  incriment: 4

  # @param canvas canvas dom element 
  # @param imgSrc path to image src (can be a relative path)
  initialize: (canvas, imgSrc, interactive=true) ->
    return unless canvas
    return unless imgSrc
    @canvas = canvas
    @imgSrc = imgSrc
  	@ctx = @canvas.getContext('2d')
      
    @setDimensions()
    @createCanvas @docWidth, @docHeight
    @createImage @docWidth, @docHeight
    @setupMouseEvents() if interactive

  draw: ->
    y = @cellSize
    n = @data.length

    # iterate through the data matrix
    while y < n
      nn = @data[0].length
      x = @cellSize
      while y < nn
        @drawCell x, y, @data[y][x], @ctx
        x += @cellSize
      x += @cellSize

  drawCell: (x, y, cell, ctx) ->
    if cell != undefined
      ctx.fillStyle = "rgb(#{cell[0]}, #{cell[1]}, #{cell[2]})"
      ctx.fillRect(x, y, @brushSize, @brushSize)

  drawPixelSquare: (x, y, cell, ctx) ->
    @drawCell x, y, cell, ctx
    @drawCell x + 1, y + 1, cell, ctx
    @drawCell x, y + 1, cell, ctx
    @drawCell x + 1, y, cell, ctx 

  drawImageData: (width, height, ctx, myImage) ->
    ctx.drawImage(myImage, 0, 0, width, height)

    # Get the CanvasPixelArray from the given coordinates and dimensions.
    imgd = ctx.getImageData(0, 0, width, height)
    pix = imgd.data        
    row = 0
    counter = 0
    data = [[]]

    # format the pixel data so that is easier to iterate through when drawing
    i = 0
    n = pix.length
    while i < n
      data[row][counter] = [pix[i], pix[i+1], pix[i+2]]
            
      if counter >= (width -1)
        counter = 0                
        row++
        data[row] = []
      else
        counter++
      i += @incriment

    @data = data      
    @draw()

  createCanvas: (width, height) ->
    # Create an empty canvas element
    canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height
        
    # Copy the image contents to the canvas
    ctx = canvas.getContext("2d")

  createImage: (width, height) ->
    myImage = new Image()
    myImage.onload = => @drawImageData(width, height, ctx, myImage)
    myImage.src = @imgSrc

  setupMouseEvents: ->
    $('body').mousemove (evt) =>
      cell = @data[evt.pageY][evt.pageX]  
      @drawPixelSquare evt.pageX, evt.pageY, cell, @ctx

  setDimensions: ->
    @docWidth = jQuery(window).width()
    @docHeight = Math.floor(@docWidth * 0.75)
    @canvas.setAttribute("height", @docHeight)
    @canvas.setAttribute("width", @docWidth)  
