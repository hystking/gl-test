var WindowManager = function(w){
  var dis = this;
  this.w = w;
  this.onResize = function(){};
  this.set();
  this.w.addEventListener("resize", function(){
    dis._onResize();
  });
};
WindowManager.prototype = {
  "set": function(){
    var w = this.w;
    this.innerWidth = this.w.innerWidth;
    this.innerHeight = this.w.innerHeight;
  },
  "_onResize": function(){
    this.onResize();
    this.set();
  }
};

module.exports = WindowManager;
