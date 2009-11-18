<%@ language="javascript"%>
<!--#include file ="class.js"-->
<%

// require('class');

// TESTING ...
var fso  = Server.CreateObject("Scripting.FileSystemObject");
var file = fso.GetFile(Server.MapPath("testing.js"));
// oFS.FileExists(sFilePathAndName)
/*
Set oFSFile = oFS.OpenTextFile(sFilePathAndName,ForWriting,True) 
oFSFile.Write(sFileContents) 
oFSFile.Close 

Set oTextStream = oFS.OpenTextFile(sFilePathAndName,1) 
sFileContents = oTextStream.ReadAll 
oTextStream.Close 
 */

var Dog = makeClass();
Dog.prototype = {
  init: function(name){
    this.name = name;
  },

  bark: function(){
    return "Woof!  My name is " + this.name;
  }
};

// something kindof like Rack for classic ASP
var Rack = {

  env: function(){
    var native = Request.ServerVariables();
    var env = {};

    for (var i = 1; i < (native.Count + 1); i++)
      env[native.Key(i)] = native.Item(i);

    var query = Request.QueryString().Key(1);
    var path  = query.replace(/^404;https?:\/\/[^\/]+/, '');
    env['PATH_INFO'] = path;

    return env;
  },

  use: function(middleware){
    // nothing yet
  },

  run: function(app){
    var response = app(Rack.env());
    var status   = response[0];
    var headers  = response[1];
    var body     = response[2];

    Response.Status = status.toString();

    for (var key in headers)
      if (key == 'Content-Type')
        Response.ContentType = headers[key];
      else
        Response.AddHeader(key, headers[key]);

    for (var part in body){
      Response.Write(body[part]);
    }
  }
  
};

var run = Rack.run;
var use = Rack.use;

%>
