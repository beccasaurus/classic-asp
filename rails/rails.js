req(uire('rack/rack'));
req(uire('util/io'));
req(uire('util/json2'));
req(uire('util/makeClass'));
req(uire('sinatra/haml'));

function controller(prototype){
  var klass = makeClass();
  klass.prototype = prototype;
  klass.prototype.render_text = function(text){
    return [200, {}, [text]];
  };
  return klass;
}

function rails_app(root_directory){
  // need to load in all of the models & controllers from app/{models|controllers}/*.js
  return function(){ return [200, {}, ["this will be a rails app"]] };
}
