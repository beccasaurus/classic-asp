// ADO Wrapper
req(uire('makeClass'));

var DB = {};

DB.Connection = makeClass();
DB.Connection.prototype = {

  // we only use ODBC DSNs for now
  init: function(dsn){
    this.dsn = dsn;
  },

  // returns tables ... just as hashes of info for now
  tables: function(){
    if (this._tables == null){
      this._tables = {};
      var rs = this._conn().OpenSchema(20);
      rs.MoveFirst()
      while (rs.EOF != true){
        
        var name = rs('TABLE_NAME').value;
        if (this._tables[name] == null)
          this._tables[name] = {};

        for (var i = 0; i < rs.Fields.Count; i++){
          var field = rs.Fields(i);
          this._tables[name][field.name.toLowerCase().replace(/^table_/, '')] = field.value;
        }

        rs.MoveNext();
      }
    }
    return this._tables;
  },

  _conn: function(){
    if (this._connection == null && this.dsn != null){
      this._connection = Server.CreateObject("ADODB.Connection");
      this._connection.Open(this.dsn);
    }
    return this._connection;
  }
}

// returns a new connection object that uses an ODBC System DSN
DB.odbc = function(dsn){
  return new DB.Connection(dsn);
}
