[![build status](https://api.travis-ci.org/zamiang/jquery.pointilize.png)](http://travis-ci.org/zamiang/jquery.pointilize)

# jQuery.pointilize

Pointilizes an image using html5 canvas. Takes an image and draws
every #cellSize pixel. The user can rollover the image to draw in the
additional pixels

For documentation, usage and examples please see
http://zamiang.github.com/jquery.pointilize/

See [this example](http://htmlpreview.github.com/?https://github.com/zamiang/jquery.pointilize/blob/master/example/index.html)

## Usage

Download the [production version](https://raw.github.com/zamiang/jquery.pointilize/master/dist/jquery.pointilize.min.js) or the [development version](https://raw.github.com/zamiang/jquery.pointilize/master/dist/jquery.pointilize.js).

Include required Javascripts
```html
<script src="jquery.js"></script>
<script src="dist/pointilize.min.js"></script>
```

Apply the pointilize plugin

```javascript
var p = new Pointilize
p.initialize({
  imgSrc: 'foo.jpg',
  interactive: true
});
```

## Contributing

Contributions and pull requests are very welcome. Please follow these guidelines when submitting new code.

### Modifying the code
1. Fork and clone the repo.
1. If needed: `npm install -g grunt` for [Grunt](https://github.com/gruntjs/grunt)
1. If needed: `brew install phantomjs` for [PhantomJS](http://phantomjs.org/download.html)
1. Run `npm install` to install dependencies
1. Run `grunt` (compiles coffeescripts and runs tests)
1. Run `grunt watch` while editing files to auto-compile coffeescripts and run tests
1. Make all changes in Coffeescript files, not JavaScript files.

### Submitting pull requests

1. Add tests for the change you want to make. Run `grunt jasmine` to see if tests fail.
1. Run `grunt` to compile new dist and make sure nothing is broken
1. Submit a Pull Request using GitHub.
