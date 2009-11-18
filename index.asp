<%@ language="javascript"%>
<%

/*
 this is the core ASP file you should redirect your IIS 404 error page to.

 this automatically requires a few useful functions and it currently assumes 
 there there is a relative rackup.js file, which is what it loads.
*/

if (this.ASP == null) var ASP = {};
if (this.$   == null) var $ = ASP;

// returns the string that we want to eval
ASP.include = function(filename){
  var fso  = Server.CreateObject("Scripting.FileSystemObject");
  var path = Server.MapPath(filename) + '.js';
  if (fso.FileExists(path)){
    var file       = fso.OpenTextFile(path, 1); 
    var javascript = file.ReadAll();
    file.Close();
    return javascript;
  } else {
    return null;
  }
};

// gets and eval's the string that we want to eval.
// you wan't be able to access anything from this file 
// in your local scope!
ASP.require = function(filename){
  eval(ASP.include(filename));
}

ASP.require('app');

%>
