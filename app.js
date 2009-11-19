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
