req(uire('sinatra/sinatra'));
req(uire('util/makeClass'));
req(uire('util/db'));

var db  = DB.odbc("dogs");
var Dog = db.model("dogs");

get('/', function(){
  return map(db.tables(), function(t){ return t.name; }).join(', ');
});

get('/dog-columns', function(){
  return JSON.stringify(Dog.columns);
});

get('/all', function(){
  return JSON.stringify(Dog.all());
});

get('/first', function(){
  return JSON.stringify(Dog.first());
});

get('/count', function(){
  return Dog.count();
});

get('/dogs/:name', function(){
  var dog = Dog.first({ name: this.params.name });
  return JSON.stringify(dog);
});

get('/dog/:id', function(){
  var dog = Dog.get(this.params.id);
  return JSON.stringify(dog);
});

post('/dogs', function(){
  Dog.create(this.params);
  return 'should have created dog ...';
});

post('/create-via-save', function(){
  var rover = new Dog(this.params);
  rover.save();
  return 'should have created dog ...';
});

run(sinatra_app);
