# pointilize.js
# https://github.com/zamiang/pointilize
#
# Pointilizes an image using html5 canvas
# Takes an image and draws every #cellSize pixel. 
# the user can rollover the image to draw in the additional pixels
#
# Copyright (c) 2013 Brennan Moore
# Licensed under the MIT license.

(($, window, document) ->

  class window.Pointilize

    mouse:
      x: -1
      y: -1

    cellSize: 3
    brushSize: 2
    incriment: 4

    # @param canvas canvas dom element 
    # @param imgSrc path to image src (can be a relative path)
    initialize: (options) ->
      throw "You must pass options" unless options
      throw "You must pass imgSrc" unless options.imgSrc
      @imgSrc = options.imgSrc
      @docWidth = jQuery(window).width()
      @docHeight = jQuery(window).height()
      @cellSize = options.cellSize if options.cellSize
      @brushSize = options.brushSize if options.brushSize
      @createCanvas @docWidth, @docHeight
      @ctx = @$el[0].getContext('2d')

      @createImage @docWidth, @docHeight
      @setupMouseEvents() if options.interactive
      @

    draw: ->
      y = @cellSize
      n = @data.length
      ctx = @$el[0].getContext('2d')

      while y < n
        nn = @data[0].length
        x = @cellSize
        while x < nn
          @drawCell x, y, @data[y][x], @ctx
          x += @cellSize
        y += @cellSize
      @ctx = ctx

    drawCell: (x, y, cell, ctx) ->
      if cell != undefined
        ctx.fillStyle = "rgb(#{cell[0]}, #{cell[1]}, #{cell[2]})"
        ctx.fillRect(x, y, @brushSize, @brushSize)

    drawPixelSquare: (x, y, cell, ctx) ->
      @drawCell x, y, cell, ctx
      @drawCell x + 1, y + 1, cell, ctx
      @drawCell x, y + 1, cell, ctx
      @drawCell x + 1, y, cell, ctx 

    drawImageData: (width, height, myImage) ->
      @ctx.drawImage(myImage, 0, 0, width, height)

      # Get the CanvasPixelArray from the given coordinates and dimensions.
      imgd = @ctx.getImageData(0, 0, width, height)
      pix = imgd.data        
      row = 0
      counter = 0
      data = [[]]

      # format the pixel data so that is easier to iterate through when drawing
      i = 0
      n = pix.length
      while i < n
        data[row][counter] = [pix[i], pix[i+1], pix[i+2]]
              
        if counter >= (width - 1)
          counter = 0                
          row++
          data[row] = []
        else
          counter++
        i += @incriment

      @data = data 
      @ctx.clearRect(0, 0, @docWidth, @docHeight);
      @draw()

    createCanvas: (width, height) ->
      @$el = $("<canvas width=#{width} height=#{height}>")
      $('body').append @$el
      @$el.height height
      @$el.width width

    createImage: (width, height) ->
      myImage = new Image()
      myImage.onload = =>
        @drawImageData(width, height, myImage)
      myImage.src = @imgSrc

    setupMouseEvents: ->
      $('body').mousemove (evt) =>
        cell = @data[evt.pageY][evt.pageX]  
        @drawPixelSquare evt.pageX, evt.pageY, cell, @ctx

)(jQuery, window, document)
