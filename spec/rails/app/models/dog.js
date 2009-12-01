// move these requirements into Rails
req(uire('util/makeClass'));
req(uire('util/db'));

// move this global into Rails someplace
var db = DB.odbc("dogs");

// -------------------------------------------------------------------

var Dog = db.model("dogs");
