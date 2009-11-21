// Response.Write("Hello World");

/* Uncomment these to run the sample Sinatra app */
//req(uire('sinatra/sample'));
//run(sinatra_app);

/* Uncomment these to run the sample Rack app */
//req(uire('rack/sample'));
//run(rack_app);

/* DATABASE TESTING */

req(uire('sinatra/sinatra'));
req(uire('util/makeClass'));
req(uire('util/db'));

var db  = DB.odbc("dogs");
var Dog = db.model("dogs");

get('/dog', function(){
  return 'First Dog: ' + JSON.stringify(Dog.first());
});

// need to add splats and/or regex for the follow types of dynamic paths ...

get('/dogs/rover', function(){
  var dog = Dog.first({ name: 'Rover' });
  return JSON.stringify(dog);
});
get('/dogs/snoopy', function(){
  var dog = Dog.first({ name: 'Snoopy' });
  return JSON.stringify(dog);
});

get('/dogs', function(){
  return 'Dogs: ' + map(Dog.all(), function(dog){ return dog.name }).join(', ');
});

get('/db', function(){
  var db = DB.odbc("dogs");

  write('tables: ' + map(db.tables(), function(t){ return t.name; }).join(', '));

  each(db.tables(), function(i, table){
    write("<ul>");
    each(table, function(key, value){
      write(n("<li>{k}: {v}</li>", { k: key, v: value }));
    });
    write("</ul>");
  });

  write("[dogs] columns");
  each(db.columns("dogs"), function(i, column){
    write("<ul>");
    write(n("<li>name: {name}</li>", column));
    write("</ul>");
  });

  return "db!";
});

get('/schema', function(){
  var db = Server.CreateObject("ADODB.Connection");
  db.Open("dogs"); // System DNS

  // get tables
  var rs = db.OpenSchema(20);
  rs.MoveFirst()
  while (rs.EOF != true){
    for (var i = 0; i < rs.Fields.Count; i++){
      var field = rs.Fields(i);
      Response.Write(field.name + ": " + field.value + "<br />");
    }
    Response.Write("<br />");
    rs.MoveNext();
  }

  Response.Write("<hr />");

  // get all tables' columns
  var rs = db.OpenSchema(4);
  rs.MoveFirst()
  while (rs.EOF != true){
    for (var i = 0; i < rs.Fields.Count; i++){
      var field = rs.Fields(i);
      Response.Write(field.name + ": " + field.value + "<br />");
    }
    rs.MoveNext();
    Response.Write("<br />");
  }

  return "schema!";
});

get('/', function(){
  var dogs = Dog.all();
  dogs = [ new Dog(), new Dog() ];

  for (var i in dogs){
    var dog = dogs[i];
    Response.Write("dog with id " + dog.id + " has name " + dog.name + "<br />");
  }

  return "hi";
});

get('/crappy', function(){
  var db = Server.CreateObject("ADODB.Connection");
  db.Open("dogs"); // the ODBC DSN

  var dog = Server.CreateObject("ADODB.Command");
  dog.ActiveConnection = db;
  dog.CommandText      = "SELECT * FROM dogs";

  var records = dog.Execute();

  Response.Write("<ul>");
  records.MoveFirst()
  while (records.EOF != true){

    Response.Write("<li>");
    for (var i = 0; i < records.Fields.Count; i++){
      var field = records.Fields(i);
      Response.Write(field.name + ": " + field.value + " ");
    }
    Response.Write("</li>");

    records.MoveNext();
  }
  Response.Write("</ul>");

  records.Close();
  records = null;
  dog     = null;
  db      = null;

  return "hello";
});

get('/haml-with-vars', function(){
  return this.haml('view-with-vars', { num: 5, foo: 'This is Foo!', stuff: [1, 3, 5, 'more', 'stuff'] });
});

run(sinatra_app);
