var glMatrix = require("gl-matrix"),
    vec3 = glMatrix.vec3,
    mat4 = glMatrix.mat4,
    async = require("async"),
    WindowManager = require("./WindowManager"),
    ScriptLoader = require("./ScriptLoader"),
    ShaderCompiler = require("./ShaderCompiler"),
    ProgramLinker = require("./ProgramLinker"),
    VBOManager = require("./VBOManager"),
    AttributeSetter = require("./AttributeSetter"),
    Camera = require("./Camera"),
    Animation = require("./Animation");

var App = function(w){
  this.wm = new WindowManager(w);
};

App.prototype = {
  "start": function(callback){
    async.series([
      this.loadShader.bind(this),
      this.main.bind(this)
    ]);
  },
  "loadShader": function(callback){
    var sl = new ScriptLoader([
      {
        id: "shader-vertex",
        src: "shader/vertex.shader",
        type: "x-shader/x-vertex"
      },
      {
        id: "shader-fragment",
        src: "shader/fragment.shader",
        type: "x-shader/x-fragment"
      }
    ]);
    sl.loadAll(callback);
  },
  "main": function(){
    var wm = this.wm,
        canvas = this.canvas = document.getElementById("canvas-main");
    canvas.width = wm.innerWidth;
    canvas.height = wm.innerHeight;

    var gl = this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clearDepth(1.0);
    gl.enable(gl.CULL_FACE);

    var sc = new ShaderCompiler(gl);
    var vertexShader = sc.compile(
        document.getElementById("shader-vertex").text,
        gl.VERTEX_SHADER
        );
    var fragmentShader = sc.compile(
        document.getElementById("shader-fragment").text,
        gl.FRAGMENT_SHADER
        );

    var pl = new ProgramLinker(gl);
    var program = pl.link([
      vertexShader,
      fragmentShader
    ]);

    var camera = new Camera(Math.PI/2, canvas.width/canvas.height, 0.1, 100);
    vec3.copy(camera.vPosition, [3.0, 0.0, 0.0]);
    vec3.copy(camera.vLookAt, [0.0, 0.0, 0.0]);
    vec3.copy(camera.vUp, [0.0, 0.0, 1.0]);

    var vertexPosition = [
      //plane 1
      1, 1, 1,
     -1, 1, 1,
      1,-1, 1,
     -1,-1, 1,
      1,-1, 1,
     -1, 1, 1,
      //plane 6
      1, 1,-1,
      1,-1,-1,
     -1, 1,-1,
     -1,-1,-1,
     -1, 1,-1,
      1,-1,-1,
      //plane 2
      1, 1, 1,
      1,-1, 1,
      1, 1,-1,
      1,-1,-1,
      1, 1,-1,
      1,-1, 1,
      //plane 5
     -1, 1, 1,
     -1, 1,-1,
     -1,-1, 1,
     -1,-1,-1,
     -1,-1, 1,
     -1, 1,-1,
      //plane 3
      1, 1, 1,
      1, 1,-1,
     -1, 1, 1,
     -1, 1,-1,
     -1, 1, 1,
      1, 1,-1,
      //plane 4
      1,-1, 1,
     -1,-1, 1,
      1,-1,-1,
     -1,-1,-1,
      1,-1,-1,
     -1,-1, 1,
    ];

    var vbom = new VBOManager(gl);
    var vbo = vbom.create(vertexPosition);
    var as = new AttributeSetter(gl, program);
    as.setVertex([
      {
        vbo: vbo,
        stride: 3,
        name: "position"
      }
    ]);
    var uniMP = gl.getUniformLocation(program, "mP");
    
    new Animation(function(t){
      var rad = t * Math.PI*2;
      camera.vPosition[0] = Math.cos(rad*3) * 3;
      camera.vPosition[1] = Math.sin(rad*3) * 3;
      camera.vPosition[2] = Math.cos(rad*2) * 3;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniformMatrix4fv(uniMP, false, camera.calcMP());
      gl.drawArrays(gl.TRIANGLES, 0, vertexPosition.length/3|0);
      gl.flush();
    }, 20000, true).start();     
  }
};
module.exports = App;
