<!--#include file ="rack.asp"-->
<!--#include file ="json2.js"-->
<!--#include file ="haml.js"-->
<%

var paths = {};

function add_route(path, method, block){
  if (paths[path] == null)         paths[path]         = {};
  if (paths[path][method] == null) paths[path][method] = block;
}

function get(path, block){
  add_route(path, 'GET', block);
}

function sinatra_app(env){
  var path   = env['PATH_INFO']
  var method = env['REQUEST_METHOD'];

  if (paths[path] != null){
    var block = paths[path][method];
    if (block != null){
      
      var environment = {
        env:  env,
        haml: function(str){
          return Haml.to_html(Haml.parse(str));
        }
      };

      var body = block.apply(environment); // bind to 'this'

      return [ 200, {}, [body] ]
    }
  }

  return [ 200, {}, ["Could not find ditty for " + method + ' ' + path] ];
}

%>
