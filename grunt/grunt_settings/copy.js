module.exports = function(src_root, debug_root, release_root){
  var DebugTemplate = function(params){
    for(var i in params){
      this[i] = params[i];
    }
  };
  DebugTemplate.prototype = {
    expand: true,
    cwd: src_root,
    dest: debug_root
  };
  var ReleaseTemplate = function(params){
    for(var i in params){
      this[i] = params[i];
    }
  };
  ReleaseTemplate.prototype = {
    expand: true,
    cwd: src_root,
    dest: release_root
  };
  return {
    debug_favicon: new DebugTemplate({
      src: "*.ico",
    }),
    debug_html: new DebugTemplate({
      cwd: src_root+"html/",
      src: "**/*.html"
    }),
    debug_css: new DebugTemplate({
      src: "css/**/*.css"
    }),
    debug_js: new DebugTemplate({
      src: "js/lib/**/*.js",
    }),
    debug_img: new DebugTemplate({
      src: [
        "img/**/*.png",
        "img/**/*.jpeg",
        "img/**/*.jpg",
        "img/**/*.gif"
      ],
    }),
    debug_shader: new DebugTemplate({
      src: "shader/**/*.shader",
    }),
    //-------------------------------------------------------------
    release_favicon: new ReleaseTemplate({
      src: "*.ico"
    }),
    release_html: new ReleaseTemplate({
      cwd: src_root+"html/",
      src: "**/*.html"
    }),
    release_css: new ReleaseTemplate({
      src: "css/**/*.css"
    }),
    release_js: new ReleaseTemplate({
      src: "js/lib/**/*.js"
    }),
    release_img: new ReleaseTemplate({
      src: [
        "img/**/*.png",
        "img/**/*.jpeg",
        "img/**/*.jpg",
        "img/**/*.gif"
      ]
    }),
    release_shader: new ReleaseTemplate({
      src: "shader/**/*.shader",
    })
  }
};
