this.routes(function(map){

  // map.resources('dogs');

  map.get('/dogs',     { controller: 'dogs', action: 'index'  });
  map.get('/dogs2',    { controller: 'dogs', action: 'index2' });
  map.get('/dogs3',    { controller: 'dogs', action: 'index3' });

  map.get('/dogs/:id', { controller: 'dogs', action: 'show'   });

});
