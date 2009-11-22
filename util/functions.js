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
    to_return[to_return.length] = block(key, value);
  });
  return to_return;
}

function select( collection, block ){
  var to_return = [];
  each(collection, function(key, value){
    if (block(value) == true) to_return[to_return.length] = value;
  });
  return to_return;
}

function write(text){ Response.Write(text); }

// taken from jQuery nano plugin
function nano(text, variables){
  return text.replace(/\{([\w\.]*)}/g, function(str, key){
    var keys = key.split('.'), value = variables[keys.shift()];
    each(keys, function(i, key){ value = value[key]; });
    return value;
  });
}

function n(text, variables){ return nano(text, variables); }

function coll2hash(asp_collection){
  var hash = {};

  // from http://andrewu.co.uk/tools/servervariables/
  //  and http://aspjavascript.com/lesson09.asp
  for (var objItem = new Enumerator(asp_collection); !objItem.atEnd(); objItem.moveNext()) {
    var strKeyName  = objItem.item();
    var strKeyValue = asp_collection(strKeyName).Count() ? asp_collection(strKeyName).Item(1) : "";
    hash[strKeyName] = strKeyValue;
  }

  return hash;
}
