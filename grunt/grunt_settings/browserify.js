module.exports = function(src_root, debug_root, release_root){
  var browserify_src = [src_root+"js/main.js"];
  return {
    debug:{
      src: browserify_src,
      dest: debug_root+"js/app.js"
    },
    release:{
      src: browserify_src,
      dest: release_root+"js/app.js"
    }
  };
};

