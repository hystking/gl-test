var Animation = function(draw, duration, repeat){
  this.timeStamp = 0;
  this.duration = duration;
  this.repeat = repeat || false;
  this.playing = false;
  this.callback = null;
  this._draw = draw;
};

Animation.prototype = {
  "_start": function(timeStamp, callback){
    var draw = function(){
      // calc t
      t = Date.now() - timeStamp;
      if(repeat){
        t = t % duration;
      }
      if(t < 0){
        t = 0;
      }else if(t >= duration){
        t = duration;
        dis.stop(callback);
      }
      // draw it
      _draw(t/duration);
      //call next draw
      if(dis.playing && timeStamp === dis.timeStamp){
        requestAnimationFrame(draw);
        //setTimeout(draw, 30);
      }
    };
    var repeat = this.repeat;
    var duration = this.duration;
    var _draw = this._draw;
    var dis = this;
    var t;
    draw();
  },
  "start": function(callback){
    this.timeStamp = +new Date();
    this.playing = true;
    this._start(this.timeStamp, callback || null);
  },
  "stop": function(callback){
    this.playing = false;
    if(callback) callback();
  }
};

module.exports = Animation;
