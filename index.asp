<%@ language="javascript"%>
<%

/*
 this is the core ASP file you should redirect your IIS 404 error page to.

 this automatically requires a few useful functions and it currently assumes 
 there there is a relative rackup.js file, which is what it loads.
*/

function js(filename){
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

// alias eval() and js() functions so we can get as close to calling require() as possible
var req  = eval;
var uire = js;

req(uire('app'));

%>
