this.controller( 'Dogs', {
    
    index: render_view('dogs/index', { dogs: Dog.all() })

  // show: render_view('dogs/show', { dog: Dog.get(params('id')) })

});
