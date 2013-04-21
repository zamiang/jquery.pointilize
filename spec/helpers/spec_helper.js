(function() {

  beforeEach(function() {
    $("<canvas>").appendTo('body');
    return window.$el = $('canvas');
  });

  afterEach(function() {
    return $('canvas').remove();
  });

}).call(this);
