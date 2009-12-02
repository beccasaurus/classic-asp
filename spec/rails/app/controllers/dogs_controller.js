this.controller( 'Dogs', {
    
  index: function(){
    return this.render_view('dogs/index', { dogs: Dog.all() })
  },

  index2: this.render_view('dogs/index', { dogs: Dog.all() }),

  index3: render_view('dogs/index', { dogs: Dog.all() }),

  // index4: render_view({ dogs: Dog.all() })

  show: function(){
    return [200, {}, ['hello there! params: ' + JSON.stringify(this.params())]];
  }

  // show: render_view('dogs/show', { dog: Dog.get(params('id')) })

});
