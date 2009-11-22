req(uire('sinatra/sinatra'));

get('/', function(){
  return 'Hello World';
});

post('/', function(){
  return 'POST!';
});

put('/', function(){
  return 'PUT!';
});

delete_('/', function(){
  return 'DELETE!';
});

get('/foo', function(){
  return 'Bar';
});

post('/foo', function(){
  return 'POSTed to foo';
});

post('/params', function(){
  return JSON.stringify(this.params);
  return map(this.params, function(key, value){ return '' + key + ': ' + value; }).join();
});

run(sinatra_app);
