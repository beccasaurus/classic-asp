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

get('/inline-haml', function(){
  return this.render_haml('%h1 hello there');
});

get('/inline-haml-vars', function(){
  return this.render_haml('%h1= foo', { foo: 'FOO' });
});

get('/haml', function(){
  return this.haml('spec/sinatra/haml-view');
});

run(sinatra_app);
