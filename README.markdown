Classic ASP
===========

Playing around with classic ASP and implementing things like Rack and Sinatra on top of it ... cause ... I dunno ... too many beers?

Do Not Try This At Home!
------------------------

I implemented:

 * the very basics of Rack (calling apps)
 * very basic Sinatra routing
 * insanely basic ORM for CRUD operations
 * getting a few Rails-esque routes to work

Installation
------------

To get up and running, you just need to configure IIS to call a URL 
on 404, eg. "/index.asp"

Copy index.asp from this repository to your website, using the same 
name that you specified in your 404 URL so all 404s will be redirected 
to the index.asp file.

Create an app.js file.  This is your actual application, eg.

```js
Response.Write("Hello World!");
```

If you download `rack.js` and put it in your website directory, then you can write:

```js
req(uire('rack'));

run(do {
  return [200, {}, ["Hello from Rack!"]];
});
```
  
`rack.js` actually also has some dependencies so you're safer downloading the whole 
repository (the `rack` and `util` directories, at the very least).

Checkout the `spec` directory to see some example Rack/Sinatra/Rails applications 
as well as examples of using the database ORM.
