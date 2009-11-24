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

run(sinatra_app);
