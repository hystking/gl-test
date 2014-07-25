module.exports = function(src_root, debug_root, release_root){
  var JadeTemplate = function(params){
    for(var i in params){
      this[i] = params[i];
    }
  };
  JadeTemplate.prototype = {
    options: {
      data: function(){
        return require("../jade_setting.json");
      },
      pretty: true
    },
    expand: true,
    cwd: src_root + "jade/",
    src: ["[^_]*.jade"],
    dest: src_root + "html/",
    ext: ".html"
  };
  return {
    debug: new JadeTemplate(),
    release: new JadeTemplate()
  }
};
