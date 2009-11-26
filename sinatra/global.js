req(uire('sinatra/sinatra'));

var sinatra_app = new Sinatra.Application();

function get(path, block){     sinatra_app.get(    path, block); }
function post(path, block){    sinatra_app.post(   path, block); }
function put(path, block){     sinatra_app.put(    path, block); }
function delete_(path, block){ sinatra_app.delete_(path, block); }
