(function() {

  (function($, window, document) {
    return window.Pointilize = (function() {

      function Pointilize() {}

      Pointilize.prototype.mouse = {
        x: -1,
        y: -1
      };

      Pointilize.prototype.cellSize = 3;

      Pointilize.prototype.brushSize = 2;

      Pointilize.prototype.incriment = 4;

      Pointilize.prototype.initialize = function(options) {
        if (!options) {
          throw "You must pass options";
        }
        if (!options.imgSrc) {
          throw "You must pass imgSrc";
        }
        this.imgSrc = options.imgSrc;
        this.docWidth = jQuery(window).width();
        this.docHeight = jQuery(window).height();
        this.createCanvas(this.docWidth, this.docHeight);
        this.ctx = this.$el[0].getContext('2d');
        this.createImage(this.docWidth, this.docHeight);
        if (options.interactive) {
          this.setupMouseEvents();
        }
        return this;
      };

      Pointilize.prototype.draw = function() {
        var ctx, n, nn, x, y;
        y = this.cellSize;
        n = this.data.length;
        ctx = this.$el[0].getContext('2d');
        while (y < n) {
          nn = this.data[0].length;
          x = this.cellSize;
          while (x < nn) {
            this.drawCell(x, y, this.data[y][x], this.ctx);
            x += this.cellSize;
          }
          y += this.cellSize;
        }
        return this.ctx = ctx;
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

      Pointilize.prototype.drawImageData = function(width, height, myImage) {
        var counter, data, i, imgd, n, pix, row;
        this.ctx.drawImage(myImage, 0, 0, width, height);
        imgd = this.ctx.getImageData(0, 0, width, height);
        pix = imgd.data;
        row = 0;
        counter = 0;
        data = [[]];
        i = 0;
        n = pix.length;
        while (i < n) {
          data[row][counter] = [pix[i], pix[i + 1], pix[i + 2]];
          if (counter >= (width - 1)) {
            counter = 0;
            row++;
            data[row] = [];
          } else {
            counter++;
          }
          i += this.incriment;
        }
        this.data = data;
        this.ctx.clearRect(0, 0, this.docWidth, this.docHeight);
        return this.draw();
      };

      Pointilize.prototype.createCanvas = function(width, height) {
        this.$el = $("<canvas width=" + width + " height=" + height + ">");
        $('body').append(this.$el);
        this.$el.height(height);
        return this.$el.width(width);
      };

      Pointilize.prototype.createImage = function(width, height) {
        var myImage,
          _this = this;
        myImage = new Image();
        myImage.onload = function() {
          return _this.drawImageData(width, height, myImage);
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

      return Pointilize;

    })();
  })(jQuery, window, document);

}).call(this);
