<%
var File = {

  _object: function(){
    if (this._native_filesystemobject == null)
      this._native_filesystemobject = Server.CreateObject("Scripting.FileSystemObject");
    return this._native_filesystemobject;
  },

  exists: function(filename){
    return true;
  },

  read: function(filename){
    return "%p hello";
  }

};
%>
