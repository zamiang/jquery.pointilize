/*! jQuery.pointilize - v0.1.0 - 2013-04-21
* http://zamiang.github.com/jquery.pointilize
* Copyright (c) 2013 Brennan Moore; Licensed MIT */

(function() {
  var Pointilize;

  Pointilize = (function() {

    function Pointilize() {}

    Pointilize.prototype.mouse = {
      x: -1,
      y: -1
    };

    Pointilize.prototype.cellSize = 5;

    Pointilize.prototype.brushSize = 2;

    Pointilize.prototype.incriment = 4;

    Pointilize.prototype.initialize = function(canvas, imgSrc, interactive) {
      if (interactive == null) {
        interactive = true;
      }
      if (!canvas) {
        return;
      }
      if (!imgSrc) {
        return;
      }
      this.canvas = canvas;
      this.imgSrc = imgSrc;
      this.ctx = this.canvas.getContext('2d');
      this.setDimensions();
      this.createCanvas(this.docWidth, this.docHeight);
      this.createImage(this.docWidth, this.docHeight);
      if (interactive) {
        return this.setupMouseEvents();
      }
    };

    Pointilize.prototype.draw = function() {
      var n, nn, x, y, _results;
      y = this.cellSize;
      n = this.data.length;
      _results = [];
      while (y < n) {
        nn = this.data[0].length;
        x = this.cellSize;
        while (y < nn) {
          this.drawCell(x, y, this.data[y][x], this.ctx);
          x += this.cellSize;
        }
        _results.push(x += this.cellSize);
      }
      return _results;
    };

    Pointilize.prototype.drawCell = function(x, y, cell, ctx) {
      if (cell !== void 0) {
        ctx.fillStyle = "rgb(" + cell[0] + ", " + cell[1] + ", " + cell[2] + ")";
        return ctx.fillRect(x, y, this.brushSize, this.brushSize);
      }
    };

    Pointilize.prototype.drawPixelSquare = function(x, y, cell, ctx) {
      this.drawCell(x, y, cell, ctx);
      this.drawCell(x + 1, y + 1, cell, ctx);
      this.drawCell(x, y + 1, cell, ctx);
      return this.drawCell(x + 1, y, cell, ctx);
    };

    Pointilize.prototype.drawImageData = function(width, height, ctx, myImage) {
      var counter, data, i, imgd, n, pix, row;
      ctx.drawImage(myImage, 0, 0, width, height);
      imgd = ctx.getImageData(0, 0, width, height);
      pix = imgd.data;
      row = 0;
      counter = 0;
      data = [[]];
      i = 0;
      n = pix.length;
      while (i < n) {
        data[row][counter] = [pix[i], pix[i + 1], pix[i + 2]];
        if (counter >= (width(-1))) {
          counter = 0;
          row++;
          data[row] = [];
        } else {
          counter++;
        }
        i += this.incriment;
      }
      this.data = data;
      return this.draw();
    };

    Pointilize.prototype.createCanvas = function(width, height) {
      var canvas, ctx;
      canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      return ctx = canvas.getContext("2d");
    };

    Pointilize.prototype.createImage = function(width, height) {
      var myImage,
        _this = this;
      myImage = new Image();
      myImage.onload = function() {
        return _this.drawImageData(width, height, ctx, myImage);
      };
      return myImage.src = this.imgSrc;
    };

    Pointilize.prototype.setupMouseEvents = function() {
      var _this = this;
      return $('body').mousemove(function(evt) {
        var cell;
        cell = _this.data[evt.pageY][evt.pageX];
        return _this.drawPixelSquare(evt.pageX, evt.pageY, cell, _this.ctx);
      });
    };

    Pointilize.prototype.setDimensions = function() {
      this.docWidth = jQuery(window).width();
      this.docHeight = Math.floor(this.docWidth * 0.75);
      this.canvas.setAttribute("height", this.docHeight);
      return this.canvas.setAttribute("width", this.docWidth);
    };

    return Pointilize;

  })();

}).call(this);