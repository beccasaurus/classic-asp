// makeClass - By John Resig (MIT Licensed)
function makeClass(){
  return function(args){
    if ( this instanceof arguments.callee ) { 
      if ( typeof this.init == "function" ) {
        try {
          this.init.apply(this, args.callee ? args : arguments);
        } catch(e) {
          this.init.apply(this);
        }
      }
    } else {
      return new arguments.callee( arguments );
    }
  };  
}
