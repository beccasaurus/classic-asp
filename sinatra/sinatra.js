req(uire('rack/rack'));
req(uire('util/io'));
req(uire('util/json2'));
req(uire('sinatra/haml'));

var paths = {};

function add_route(path, method, block){
  if (paths[path] == null)         paths[path]         = {};
  if (paths[path][method] == null) paths[path][method] = block;
}

function get(path, block){
  add_route(path, 'GET', block);
}

// on IIS you cannot POST to paths without extensions!  Oo
// so we need to add a .asp unless the path is /
// because ... that's just the way it works!
function post(path, block){
  if (path != '/') path = path + '.asp';
  add_route(path, 'POST', block);
}

function put(path, block){
  if (path != '/') path = path + '.asp';
  add_route(path, 'PUT', block);
}

function delete_(path, block){
  if (path != '/') path = path + '.asp';
  add_route(path, 'DELETE', block);
}

function sinatra_app(env){
  var path   = env['PATH_INFO']
  var method = env['REQUEST_METHOD'];

  if (paths[path] != null){
    var block = paths[path][method];
    if (block != null){
      
      var environment = {
        env: env,
        render_haml: function(text, scope){
          return Haml.to_html(Haml.parse.call(scope, text));
        },
        haml: function(filename, scope){
          var text = File.read(filename + '.haml');
          return this.render_haml(text, scope);
        }
      };

      var body = block.apply(environment); // bind to 'this'

      return [ 200, {}, [body] ]
    }
  }

  return [ 404, {}, ["Could not find ditty for " + method + ' ' + path] ];
}
