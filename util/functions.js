// random helpful functions

function each( collection, block, include_functions ){
  for (var key in collection)
    if (typeof(collection[key]) === "function"){
      if (include_functions === true) block(key, collection[key]);
    } else
      block(key, collection[key]);
};

function map( collection, block ){
  var to_return = [];
  each(collection, function(key, value){
    to_return[to_return.length] = block(value);
  });
  return to_return;
}

function write(text){ Response.Write(text); }