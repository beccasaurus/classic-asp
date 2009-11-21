req(uire('rack/rack'));

function rack_app(env) {
  var method = env['REQUEST_METHOD'];
  var path   = env['PATH_INFO'];

  switch(path){
    
    case '/':
      return [200, {}, ['Hello World']];
      break;
    
    case '/foo':
      return [200, {}, ['Bar!']];
      break;
    
    case '/json':
      return [200, {'Content-Type': 'application/json'}, ['{ id: 1, name: "Rover" }']];
      break;

    default:
      return [404, {}, ["Don't know what to return for " + method + ' ' + path]]
  }
}

run(rack_app);
