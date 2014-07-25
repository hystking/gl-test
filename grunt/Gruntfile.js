module.exports = function(grunt){
  var hostname = "172.21.32.73";
  var port = 9000;
  var src_root = "src/";
  var debug_root = "../debug/";
  var release_root = "../htdocs/";
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    /*
       ----- COMPASS -----
    */
    compass: {
      debug: {
        options: {
          config: "config_debug.rb"
        }
      },
      release: {
        options: {
          config: "config_release.rb"
        }
      }
    },
    /*
       ----- JADE -----
    */
    jade: require("./grunt_settings/jade")(src_root, debug_root, release_root),
    /*
       ----- JSHINT -----
    */
    jshint: {cwd: src_root+"js/app/"},

    /*
       ----- BROWSERIFY -----
    */
    browserify: require("./grunt_settings/browserify")(src_root, debug_root, release_root),

    /*
       ----- CLEAN -----
    */

    clean: {
      options: {force: true},
      dest: release_root
    },

    /*
       ----- COPY -----
    */
    copy: require("./grunt_settings/copy")(src_root, debug_root, release_root),

    /*
       ----- CONNECT -----
    */

    connect: {
      debug: {
        options: {
          port: port,
          hostname: hostname,
          base: debug_root
        }
      }
    },

    /*
       ----- OPEN -----
    */

    open: {
      browser: {
        path: "http://"+hostname+":"+port+"/",
        app: "Google Chrome"
      }
    },

    /*
       ----- WATCH -----
    */

    watch: require("./grunt_settings/watch")(src_root, debug_root, release_root),

    /*
       ----- PNGMIN -----
    */

    pngmin: {
      release: {
        options: {
          force: true,
          ext: ".png"
        },
        files: [
          {
            src: release_root+"img/*.png",
            dest: release_root+"img/"
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-compass");
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-connect");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-open");
  grunt.loadNpmTasks("grunt-pngmin");
  grunt.loadNpmTasks("grunt-browserify");

  var debug_compile = [
    "compass:debug",
    "jade:debug",
    "jshint",
    "browserify:debug",
    "copy:debug_favicon",
    "copy:debug_css",
    "copy:debug_js",
    "copy:debug_shader",
    "copy:debug_img",
    "copy:debug_html"
  ];

  var release_compile = [
    "clean",
    "compass:release",
    "jade:release",
    "jshint",
    "browserify:release",
    "copy:release_favicon",
    "copy:release_css",
    "copy:release_js",
    "copy:release_shader",
    "copy:release_img",
    "copy:release_html",
    "pngmin:release"
  ];

  var watch_tasks = [
    "connect:debug",
    "open:browser",
    "watch"
  ];

  grunt.registerTask("default", debug_compile.concat(watch_tasks));
  grunt.registerTask("release", release_compile);
};
