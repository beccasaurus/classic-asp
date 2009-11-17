<!--#include file ="rack.asp"-->
<%

run(function(env) {
  return [ 
    200, 
    {'Content-Type': 'text/plain'},
    ["Hello World!  You're viewing " + env['PATH_INFO']]
  ];
});

%>
