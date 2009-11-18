$.require('makeClass');

$.Dog = $.makeClass();
$.Dog.prototype = {

  init: function(name){
    this.name = name;
  },

  bark: function(){
    return "Woof!  My name is " + this.name;
  }

};
