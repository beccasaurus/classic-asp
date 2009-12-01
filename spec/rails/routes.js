this.routes(function(map){

  // map.resources('dogs');

  map.get('/dogs',     { controller: 'dogs', action: 'index' });
  map.get('/dogs/:id', { controller: 'dogs', action: 'show'  });

});
