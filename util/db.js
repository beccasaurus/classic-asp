req(uire('util/makeClass'));
req(uire('util/functions'));

var DB = {

  getRows: function(recordset){
    var rows = [];
    if (recordset.EOF == true) return rows;
    recordset.MoveFirst()
    while (recordset.EOF != true){
      var attributes = {};
      for (var i = 0; i < recordset.Fields.Count; i++){
        var field = recordset.Fields(i);
        attributes[field.name] = field.value;
      }
      rows[rows.length] = attributes;
      recordset.MoveNext();
    }
    return rows;
  }

};

DB.Column = makeClass();
DB.Column.prototype = {
  init: function(options){
    for (var key in options)
      this[key.toLowerCase().replace(/^column_/, '')] = options[key];
  }
};

DB.Table = makeClass();
DB.Table.prototype = {
  init: function(options){
    for (var key in options)
      this[key.toLowerCase().replace(/^table_/, '')] = options[key];
  }
};

DB.Connection = makeClass();
DB.Connection.prototype = {

  // we only use ODBC DSNs for now
  init: function(dsn){
    this.dsn = dsn;
  },

  tables: function(){
    if (this._tables == null){
      var rs       = this._conn().OpenSchema(20); // all tables
      var rows     = DB.getRows(rs);
      this._tables = map(rows, function(i,row){ return new DB.Table(row); });
    }
    return this._tables;
  },

  columns: function(table_name){
    var rs      = this._conn().OpenSchema(4); // all columns
    var rows    = DB.getRows(rs);
    var columns = map(rows, function(i,row){ return new DB.Column(row); });
    if (table_name != undefined)
      columns = select(columns, function(column){ return column.table_name == table_name; });
    return columns;
  },

  model: function(table_name){
    return DB.model(this, table_name);
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

// returns a new 'model' class
DB.model = function(db, table_name){
  var klass = makeClass();
  
  // variables
  klass.db         = db;
  klass.table_name = table_name;
  klass.columns    = db.columns(table_name);

  // instance functions
  klass.prototype = {
    init: function(options){
      for (var key in options) this[key] = options[key];
    }
  };

  // class functions
  klass.query = function(sql){
    return DB.getRows(klass.db._conn().Execute(sql));
  };
  klass.nonquery = function(sql){
    write(sql);
    klass.db._conn().Execute('insert into dogs (name) VALUES ("Testing")');
  };

  klass.all = function(options){
    var sql = "select * from " + klass.table_name;
  
    if (options != null){
      each(options, function(key, value){
        if (value != null && key != 'limit')
          sql = sql + " WHERE " + key + " = " + JSON.stringify(value);
      });
      
      if (options.limit != null) sql = sql + " LIMIT " + options.limit;
    }

    // write('SQL: ' + sql + '<br />');

    return map(klass.query(sql), function(i,row){
      return new klass(row);
    });
  };

  klass.first = function(options){
    if (options == null) options = {};
    options.limit = 1;
    return klass.all(options)[0];
  };

  klass.get = function(id){
    return klass.first({ id: id });
  };

  klass.create = function(attributes){
    var sql = 'INSERT INTO ' + klass.table_name;
    sql = sql + ' (' + map(attributes, function(name,value){ return name; }).join(', ') + ') ';
    sql = sql + 'VALUES (' + map(attributes, function(name,value){ return JSON.stringify(value); }).join(', ') + ')';
    klass.nonquery(sql);
  };

  klass.count = function(options){
    if (options == null) options = {};
    var rows = klass.query('select count(*) from ' + klass.table_name);
    return rows[0]['count(*)'];
  };

  // get column information (we do this once!)
  // ...

  return klass;
};
