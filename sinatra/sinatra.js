req(uire('rack/rack'));
req(uire('util/io'));
req(uire('util/json2'));
req(uire('util/makeClass'));
req(uire('sinatra/haml'));

var routes = [];

var SinatraRoute = makeClass();
SinatraRoute.prototype = {
  init: function(path, method, block){
    this.path   = path;
    this.method = method;
    this.block  = block;

    // allow regular expressions (as paths)
    if (typeof(this.path['test']) == 'function'){
      this.regexp = this.path;
    } else {

      // grab named parameters, eg. /dogs/:name
      var named_parameters = this.path.match(/:([^\/\.]+)/g);
      for (var i in named_parameters)
        named_parameters[i] = named_parameters[i].toString().replace(':', '');
      
      if (named_parameters != null && named_parameters.length > 0){
        this.named_parameters = named_parameters;
        this.regexp = new RegExp("^" + this.path.replace(/:([^\/\.]+)/g, '([^\/]+)') + "$");
      } else {
        this.regexp = new RegExp("^" + this.path + "$");
      }
    }
  },

  matches: function(path, method){
    // write('matching ' + this.regexp + ' against ' + path + "\n");
    if (this.method != method) // wrong method
      return false;

    if (this.regexp.test(path)) // method and regexp match
      return true;
  }
};

function match_route(path, method){
  for (var i in routes)
    if (routes[i].matches(path, method))
      return routes[i];
}

function add_route(path, method, block){
  routes[ routes.length ] = new SinatraRoute(path, method, block);
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

  var route = match_route(path, method);
  if (route != null){
    var block = route.block;

    var params = coll2hash(Request.Form());
    each(env.QUERY_STRINGS, function(key, value){
      params[key] = value;
    });

    var environment = {
      status:  200,
      env:     env,
      params:  params,
      headers: { 'Content-Type': 'text/html' },
      render_haml: function(text, scope){
        return Haml.to_html(Haml.parse.call(scope, text));
      },
      haml: function(filename, scope){
        var text = File.read(filename + '.haml');
        return this.render_haml(text, scope);
      },
      redirectTo: function(path){
        environment.status = 301;
        environment.headers['Location'] = 'http://' + env['SERVER_NAME'] + path;
      }
    };

    // take any matches from the regular expression match 
    // and add them to params, as params.matches
    var regexp_matches = path.match(route.regexp);
    if (regexp_matches != null){
      regexp_matches.shift(); // remove the first (the full match)
      if (regexp_matches.length > 0)
        environment.params.matches = regexp_matches;
    }

    // add named parameters to the params
    if (route.named_parameters != null && regexp_matches != null){
      for (var i in route.named_parameters){
        var name  = route.named_parameters[i];
        var value = regexp_matches[i];
        environment.params[name] = value;
      }
    }

    // make the raw route available, incase we need it ... PRIVATE API!
    environment._route = route;

    var body = block.apply(environment, regexp_matches); // bind to 'this'

    return [ environment.status, environment.headers, [body] ]
  }

  return [ 404, {}, ["Could not find ditty for " + method + ' ' + path] ];
}
