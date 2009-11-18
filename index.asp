<%@ language="javascript"%>
<%

/*
 this is the core ASP file you should redirect your IIS 404 error page to.

 this automatically requires a few useful functions and it currently assumes 
 there there is a relative rackup.js file, which is what it loads.
*/

if (this.ASP == null) var ASP = {};
if (this.$   == null) var $ = ASP;

ASP.require = function(filename){
  var fso  = Server.CreateObject("Scripting.FileSystemObject");
  var path = Server.MapPath(filename) + '.js';
  if (fso.FileExists(path)){
    var file       = fso.OpenTextFile(path, 1); 
    var javascript = file.ReadAll();
    file.Close();
    eval(javascript);
  } else {
    Response.Write("File not found: " + filename);
  }
}

ASP.require('app');

%>
