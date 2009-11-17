<%@ language="javascript"%>
<%
  // Response.Write write an object
  function w(obj){
    Response.Write(obj.toString());
  }

  function printCollection(coll){
    for (var i = 1; i < (coll.Count + 1); i++) {
      Response.Write( coll.Key(i) + ' = ' + coll.Item(i) + "\n" );
    }
  }

  var stuff = [1, 5, 'hello', "there"];
%>
<html>
  <head>
    <title>Testing Classic ASP</title>
  </head>
  <body>
    <pre><% printCollection( Request.ServerVariables() ) %></pre>
  </body>
</html>
