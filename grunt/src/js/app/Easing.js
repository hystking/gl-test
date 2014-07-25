module.exports = {
  "easeIn": function(t){
    return t * t;
  },
  "easeIn3": function(t){
    return t * t * t;
  },
  "easeIn4": function(t){
    return t * t * t * t;
  },
  "easeOut": function(t){
    var _t = 1-t;
    return 1 - _t * _t;
  },
  "easeOut3": function(t){
    var _t = 1-t;
    return 1 - _t * _t * _t;
  },
  "easeOut4": function(t){
    var _t = 1-t;
    return 1 - _t * _t * _t * _t;
  },
  "easeInOut": function(t){
    if(t < 0.5){
      t = t / 0.5;
      return t * t * 0.5;
    }
    t = t / 0.5 - 1;
    return (2 - (1-t) * (1-t)) * 0.5;
  },
  "attack": function(t, a){
    return ((1 - t * t) * a + 1) * t;
  },
  "roundTrip": function(t){
    if(t < 0.5){
      return t / 0.5;
    }
    return (1 - t) / 0.5;
  },
  "bezier2d3": function(x1, y1, x2, y2, x3, y3, t){
    var t_ = 1-t;
    return [
      x1*t_*t_ + x2*2*t_*t + x3*t*t,
      y1*t_*t_ + y2*2*t_*t + y3*t*t
        ];
  },
  "bezier2d4": function(x1, y1, x2, y2, x3, y3, x4, y4, t){
    var t_ = 1-t;
    return [
      x1*t_*t_*t_ + x2*3*t_*t_*t + x3*3*t_*t*t + x4*t*t*t,
      y1*t_*t_*t_ + y2*3*t_*t_*t + y3*3*t_*t*t + y4*t*t*t
        ];
  }
};

