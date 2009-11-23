var File = {

  _object: function(){
    if (this._native_filesystemobject == null)
      this._native_filesystemobject = Server.CreateObject("Scripting.FileSystemObject");
    return this._native_filesystemobject;
  },

  path: function(filename){
    filename = filename.replace(/\//g, '\\');
    if (/^\w:\\/.test(filename.toLowerCase())) // we already have an absolute filename
      return filename;
    else
      return Server.MapPath(filename);
  },

  dirname: function(path){
    return path.replace(/\\[^\\]*$/, '');
  },

  join: function(){
    var path = arguments[0];
    for(var i = 1; i < arguments.length; i++)
      path = path + '\\' + arguments[i];
    return path;
  },

  exists: function(filename){
    return this._object().FileExists( this.path(filename) );
  },

  read: function(filename){
    if (this.exists(filename)){
      write('opening file: ' + this.path(filename));
      var file = this._object().OpenTextFile(this.path(filename), 1);
      var body = file.ReadAll();
      file.Close();
      return body;
    } else {
      write('file not found: ' + this.path(filename));
      return "File not found: " + filename;
    }
  }

};
