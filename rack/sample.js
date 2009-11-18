req(uire('rack/rack'));

function rack_app(env) {
  return [ 
    200, 
    {'Content-Type': 'text/plain'},
    ["Hello World!  You're viewing " + env['PATH_INFO']]
  ];
}
