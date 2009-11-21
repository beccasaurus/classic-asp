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

run(sinatra_app);
