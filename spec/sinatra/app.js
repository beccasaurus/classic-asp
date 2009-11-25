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

get('/haml-vars', function(){
  return this.haml('spec/sinatra/haml-view-vars', { foo: 'FOO' });
});

get('/return-404', function(){
  this.status = 404;
  return "hello!";
});

get('/foo.xml', function(){
  this.headers['Content-Type'] = 'application/xml';
  return "<xml></xml>!";
});

get(/regex-\d/, function(){
  return "Regexp match";
});

get(/regex-match-(\d+)/, function(){
  return "Number: " + this.params.matches[0];
});

get('/dynamic/:name', function(){
  return "Dynamic: " + this.params['name'];
});

get(/\/say\/(\w+)\/(\w+)/, function(foo, bar){
  return 'Say: ' + foo + ' ... ' + bar;
});

get(/\/say\/(\w+)/, function(foo){
  return 'Say: ' + foo;
});

get('/say2/:something/:else', function(foo, bar){
  return 'Say: ' + foo + ' ... ' + bar;
});

get('/say2/:something', function(foo){
  return 'Say: ' + foo;
});

get('/redirects', function(){
  this.redirectTo('/redirect-to-me');
});

get('/redirect-to-me', function(){
  return "You were redirected";
});

run(sinatra_app);
