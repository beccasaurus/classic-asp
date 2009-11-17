<!--#include file ="rack.asp"-->
<!--#include file ="sinatra.asp"-->
<%

get('/home', function(){
  return "Home page";
});

get('/env', function(){
  return "The env: " + this.env['REQUEST_METHOD'];
});

run(sinatra_app);

%>
