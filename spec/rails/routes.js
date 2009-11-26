this.routes(function(map){

  // map.resources('cats');

  map.get('/cats', { controller: 'cats', action: 'index' });

});
