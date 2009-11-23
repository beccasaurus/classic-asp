<%@ language="javascript"%>
<%

/*
 this is the core ASP file you should redirect your IIS 404 error page to.

 this automatically requires a few useful functions and it currently assumes 
 there there is a relative rackup.js file, which is what it loads.
*/

// the name of the current file, tracked via the use of req(uire())
var __FILE__ = Server.MapPath('index.asp');

function js(filename){
  var fso    = Server.CreateObject("Scripting.FileSystemObject");
  var path   = Server.MapPath(filename) + '.js';
  var before = __FILE__;
  __FILE__   = path;
  Response.Write('set file: ' + __FILE__ + '<br />');
  if (fso.FileExists(path)){
    var file       = fso.OpenTextFile(path, 1); 
    var javascript = file.ReadAll();
    file.Close();
    return javascript;
  } else {
    return null;
  }
  __FILE__ = before;
  Response.Write('reset file: ' + __FILE__ + '<br />');
};

// alias eval() and js() functions so we can get as close to calling require() as possible
var req  = eval;
var uire = js;

Response.Write('requiring app <br />');
req(uire('app'));
Response.Write('required app <br />');

__FILE__ = Server.MapPath('index.asp'); // after executing files, reset the __FILE__

%>
