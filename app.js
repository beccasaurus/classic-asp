req(uire('sinatra/sinatra'));

run(new Sinatra.Application(function(){

  this.get('/', function(){
    return 'Hello World';
  });

  this.post('/', function(){
    return 'POST!';
  });

  this.put('/', function(){
    return 'PUT!';
  });

  this.delete_('/', function(){
    return 'DELETE!';
  });

  this.get('/foo', function(){
    return 'Bar';
  });

  this.post('/foo', function(){
    return 'POSTed to foo';
  });

  this.post('/params', function(){
    return JSON.stringify(this.params);
    return map(this.params, function(key, value){ return '' + key + ': ' + value; }).join();
  });

  this.get('/inline-haml', function(){
    return this.render_haml('%h1 hello there');
  });

  this.get('/inline-haml-vars', function(){
    return this.render_haml('%h1= foo', { foo: 'FOO' });
  });

  this.get('/haml', function(){
    return this.haml('spec/sinatra/haml-view');
  });

  this.get('/haml-vars', function(){
    return this.haml('spec/sinatra/haml-view-vars', { foo: 'FOO' });
  });

  this.get('/return-404', function(){
    this.status = 404;
    return "hello!";
  });

  this.get('/foo.xml', function(){
    this.headers['Content-Type'] = 'application/xml';
    return "<xml></xml>!";
  });

  this.get(/regex-\d/, function(){
    return "Regexp match";
  });

  this.get(/regex-match-(\d+)/, function(){
    return "Number: " + this.params.matches[0];
  });

  this.get('/dynamic/:name', function(){
    return "Dynamic: " + this.params['name'];
  });

  this.get(/\/say\/(\w+)\/(\w+)/, function(foo, bar){
    return 'Say: ' + foo + ' ... ' + bar;
  });

  this.get(/\/say\/(\w+)/, function(foo){
    return 'Say: ' + foo;
  });

  this.get('/say2/:something/:else', function(foo, bar){
    return 'Say: ' + foo + ' ... ' + bar;
  });

  this.get('/say2/:something', function(foo){
    return 'Say: ' + foo;
  });

  this.get('/redirects', function(){
    this.redirectTo('/redirect-to-me');
  });

  this.get('/redirect-to-me', function(){
    return "You were redirected";
  });
  
}));
