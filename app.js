// Response.Write("Hello World");

/* Uncomment these to run the sample Sinatra app */
//req(uire('sinatra/sample'));
//run(sinatra_app);

/* Uncomment these to run the sample Rack app */
//req(uire('rack/sample'));
//run(rack_app);

/* DATABASE TESTING */
req(uire('sinatra/sinatra'));

get('/', function(){
  return "Hello World!"
});

get('/haml-with-vars', function(){
  return this.haml('view-with-vars', { num: 5, foo: 'This is Foo!', stuff: [1, 3, 5, 'more', 'stuff'] });
});

run(sinatra_app);
