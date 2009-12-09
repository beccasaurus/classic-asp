req(uire('sinatra/global'));
req(uire('util/makeClass'));
req(uire('util/db'));

var db  = DB.odbc("dogs");
var Dog = db.model("dogs");

get('/', do {
  return map(db.tables(), function(t){ return t.name; }).join(', ');
});

get('/dog-columns', do {
  return JSON.stringify(Dog.columns);
});

get('/all', do {
  return JSON.stringify(Dog.all());
});

get('/first', do {
  return JSON.stringify(Dog.first());
});

get('/count', do {
  return Dog.count();
});

get('/dogs/:name', do {
  var dog = Dog.first({ name: this.params.name });
  return JSON.stringify(dog);
});

get('/dog/:id', do {
  var dog = Dog.get(this.params.id);
  return JSON.stringify(dog);
});

post('/dogs', do {
  Dog.create(this.params);
  return 'should have created dog ...';
});

post('/create-via-save', do {
  var rover = new Dog(this.params);
  rover.save();
  return 'should have created dog ...';
});

put('/update-dog/:old_name', do {
  var dog = Dog.first({ name: this.params.old_name });
  dog.update_attributes(this.params);
  dog.save();
  return 'should have updated Dog: ' + JSON.stringify(dog);
});

run(sinatra_app);
