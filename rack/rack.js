req(uire('util/functions'));

// something kindof like Rack for classic ASP
var Rack = {

  env: function(){
    var native = Request.ServerVariables();
    var env = {};

    for (var i = 1; i < (native.Count + 1); i++)
      env[native.Key(i)] = native.Item(i);

    if (Request.QueryString().Count > 0) {
      // okay, so ... basically ... due to the way things 
      // with with classic ASP on IIS ... the query strings 
      // will look something like this:
      //
      //   { '404;http://192.168.1.73/params.asp?foo': 'bar', 'chunky: 'bacon' }
      //
      // if you passed foo=bar and chunky=bacon
      //
      // the way 404's are handled on IIS, the first part of the key of the 
      // first query string has the actual path, so we need to pull it out.
      var query_strings = coll2hash(Request.QueryString());
      var path_info     = '/';

      each( query_strings, function(key, value){
        if (/^404;/.test(key) == true){
          // this one has the path in it
          
          var path_with_query = key.replace(/404;https?:\/\/[^\/]+/, '');

          if (/\?/.test(path_with_query) == true){
            // this one has the path in it AND a query string key
          
            path_info = path_with_query.replace(/\?.*/, '');
            var real_key  = path_with_query.replace(/.*\?/, '');

            // remove this key (cause it's not a real querystring key) 
            // and add the real key and value
            delete query_strings[key];
            if (real_key != '') query_strings[real_key] = value;

            return false;
          
          } else {
            // this is not a real query string!  it just has the path in it.
            path_info = path_with_query;
            delete query_strings[key];
          }
        }
      });

      env['QUERY_STRINGS'] = query_strings;
      env['PATH_INFO'] = path_info;
    } else {
      env['PATH_INFO'] = '/';
    }

    return env;
  },

  use: function(middleware){
    // nothing yet
  },

  run: function(app){
    var response = app.call(this, Rack.env());
    var status   = response[0];
    var headers  = response[1];
    var body     = response[2];

    Response.Status = status.toString();

    for (var key in headers)
      if (key == 'Content-Type')
        Response.ContentType = headers[key];
      else
        Response.AddHeader(key, headers[key]);

    for (var part in body){
      Response.Write(body[part]);
    }
  }
  
};

var run = Rack.run;
var use = Rack.use;
