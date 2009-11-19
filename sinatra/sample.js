req(uire('sinatra/sinatra'));

get('/home', function(){
  return "Home page";
});

get('/env', function(){
  var body = "";
  for (var key in this.env)
    body = body + key + " = "  + this.env[key] + "<br />";
  return body;
});

get('/dog', function(){
  var dog = new Dog("Rover");
  return dog.bark();
});

get('/haml', function(){
  return this.render_haml("%h1 Hello There\n%ul.foo\n  %li hello\n  %li there");
});

get('/view', function(){
  return this.haml('view');
});

get('/view-with-vars', function(){
  return "pending";
});
