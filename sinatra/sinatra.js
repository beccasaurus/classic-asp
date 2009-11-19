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

  return [ 200, {}, ["Could not find ditty for " + method + ' ' + path] ];
}
