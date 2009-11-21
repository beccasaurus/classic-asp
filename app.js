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

function dbClass(table){
  var klass = makeClass();
  
  // instance functions
  klass.prototype = {
    init: function(){
    
    }
  };

  // class functions
  klass.all = function(){};

  // get column information (we do this once!)
  // ...

  return klass;
}

var Dog = dbClass("dogs");

get('/db', function(){
  var db = DB.odbc("dogs");

  each(db.tables(), function(i, table){
    write("<ul>");
    each(table, function(key, value){
      write("<li>" + key + ": " + value + "</li>");
    });
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
