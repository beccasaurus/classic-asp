var File = {

  _object: function(){
    if (this._native_filesystemobject == null)
      this._native_filesystemobject = Server.CreateObject("Scripting.FileSystemObject");
    return this._native_filesystemobject;
  },

  path: function(filename){
    return Server.MapPath(filename);
  },

  exists: function(filename){
    return this._object().FileExists( this.path(filename) );
  },

  read: function(filename){
    if (this.exists(filename)){
      var file = this._object().OpenTextFile(this.path(filename), 1);
      var body = file.ReadAll();
      file.Close();
      return body;
    } else {
      return "File not found: " + filename;
    }
  }

};
