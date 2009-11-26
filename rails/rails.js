req(uire('rack/rack'));
req(uire('util/io'));
req(uire('util/json2'));
req(uire('util/makeClass'));
req(uire('sinatra/haml'));

// global Rails namespace
var Rails = {};

// Router.
// Is initialized with an array that it persists 
// the routes (Route objects) to.
Rails.Router = makeClass();
Rails.Router.prototype = {
  init: function(routes){
    this.routes = routes;
  },
  get: function(path, options){
    // ... need to modularize the Sinatra router ... wanna use it here!
  }
}

// Rails Application class
Rails.Application = makeClass();
Rails.Application.prototype = {

  init: function(root_directory){
    this.root = root_directory;
    
    // initialize configuration
    
    // initialize models
    
    // initialize controllers
    this.controllers = [];

    // initialize routes
    req(uire(this.root + '/routes'));
  },

  // Rack #call function
  call: function(env){
    return [ 200, {}, ["You #call'd a Rails app"] ];
  },

  routes: function(block){
    block.call(this, new Rails.Router(this.routes));
  }

};

// will be re-writing this ...
function controller(prototype){
  var klass = makeClass();
  klass.prototype = prototype;
  klass.prototype.render_text = function(text){
    return [200, {}, [text]];
  };
  return klass;
}
