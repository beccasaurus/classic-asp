req(uire('rack/rack'));
req(uire('util/io'));
req(uire('util/json2'));
req(uire('util/makeClass'));
req(uire('sinatra/haml'));
req(uire('sinatra/sinatra')); // we really just want the Sinatra.Router ...

// GLOBAL FUNCTIONS
function render_view(view, variables){
  //var text     = File.read(this.app.root + '/app/views/' + view + '.haml');
  //var response = [200, {}, [ Haml.to_html(Haml.parse.call(variables, text)) ]];

  var response = [200, {}, [ "hello, this: " + this ]];
  if (arguments.callee.caller != null) // called from within function
    return response;
  else
    return function(){ return response };
}

function params(key){
  write('params');
  return 1;
}

// global Rails namespace
var Rails = {};

// Base controller class
Rails.Controller = makeClass();
Rails.Controller.prototype = {

  init: function(app, name, actions){
    this.app     = app;
    this.name    = name;
    this.actions = actions;
  },

  render_text: function(text){
    return [200, {}, [text]];
  },

  call_action: function(action){
    var action = this.actions[action];
    if (action != null)
      return action.call(this);
  }

};

// Rails Application class
Rails.Application = makeClass();
Rails.Application.prototype = {

  init: function(root_directory){
    this.root   = root_directory;
    this.router = new Sinatra.Router();
    
    // initialize configuration
    req(uire(this.root + '/config'));
    
    // initialize models
    req(uire(this.root + '/app/models/dog')); // make this dynamic!
    
    // initialize controllers
    this.controllers = [];
    req(uire(this.root + '/app/controllers/dogs_controller')); // make this dynamic!

    // initialize routes
    req(uire(this.root + '/routes'));
  },

  // Rack #call function
  call: function(scope, env){
    var path   = env['PATH_INFO']
    var method = env['REQUEST_METHOD'];
    var route  = this.router.match_route(path, method);
    
    if (route != null){

      var controller = this.controllers[ route.data.controller.toLowerCase() ];
      return controller.call_action(route.data.action);

    } else
      return [ 404, {}, ['Could not find route for ' + method + ' ' + path] ];
  },

  routes: function(block){
    block.call(this, this.router);
  },

  controller: function(name, actions){
    this.controllers[name.toLowerCase()] = new Rails.Controller(this, name, actions);
  }

};
