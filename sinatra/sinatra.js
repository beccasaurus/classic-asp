req(uire('rack/rack'));
req(uire('util/io'));
req(uire('util/json2'));
req(uire('util/makeClass'));
req(uire('util/functions'));
req(uire('sinatra/haml'));

// global Sinatra namespace
var Sinatra = {};

// class representing a route which can 
// take a path and a method and tell you 
// whether or not the route matches.
//
// this also stores the code block 
// associated with this particular route
Sinatra.Route = makeClass();
Sinatra.Route.prototype = {

  init: function(path, method, data){
    this.path   = path;
    this.method = method;
    this.data   = data;

    // allow regular expressions (as paths)
    if (typeof(this.path['test']) == 'function'){
      this.regexp = this.path;
  
    // not a RegExp ... assume it is a string
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

  // returns true/false for whether or not this route matches the given path & method
  matches: function(path, method){
    if (this.method != method) // wrong method
      return false;

    if (this.regexp.test(path)) // method and regexp match
      return true;
  }
};

// class for managing multiple routes
Sinatra.Router = makeClass();
Sinatra.Router.prototype = {

  init: function(){
    this.routes = [];      
  },

  add_route: function(path, method, block){
    // on IIS you cannot POST to paths without extensions,
    // so we need to add a .asp extension unless the path is /
    if (method != 'GET' && path != '/') path = path + '.asp';
    this.routes[ this.routes.length ] = new Sinatra.Route(path, method, block);
  },

  get:     function(path, block){ this.add_route(path, 'GET',    block); },
  post:    function(path, block){ this.add_route(path, 'POST',   block); },
  put:     function(path, block){ this.add_route(path, 'PUT',    block); },
  delete_: function(path, block){ this.add_route(path, 'DELETE', block); },

  // return the route that matchis this path & method
  match_route: function(path, method){
    for (var i in this.routes)
      if (this.routes[i].matches(path, method))
        return this.routes[i];
  }

};

// class for individual Sinatra applications
Sinatra.Application = makeClass();
Sinatra.Application.prototype = {

  init: function(block){
    this.router = new Sinatra.Router();
    if (block != null) block.call(this);
  },

  get:     function(path, block){ this.router.get(    path, block); },
  post:    function(path, block){ this.router.post(   path, block); },
  put:     function(path, block){ this.router.put(    path, block); },
  delete_: function(path, block){ this.router.delete_(path, block); },

  // Rack #call function
  call: function(scope, env){
    var path   = env['PATH_INFO']
    var method = env['REQUEST_METHOD'];

    var route = this.router.match_route(path, method);
    if (route != null){
      var block = route.data;

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

      // TODO move regexp matches and named params into the Router!

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
};
