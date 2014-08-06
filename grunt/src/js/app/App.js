var glMatrix = require("gl-matrix"),
    vec3 = glMatrix.vec3,
    vec4 = glMatrix.vec4,
    mat4 = glMatrix.mat4,
    async = require("async"),
    WindowManager = require("./WindowManager"),
    ScriptLoader = require("./ScriptLoader"),
    GLUtil = require("./GLUtil"),
    Camera = require("./Camera"),
    Animation = require("./Animation"),
    Easing = require("./Easing");

var App = function(w){
  this.wm = new WindowManager(w);
};

App.prototype = {
  "start": function(callback){
    async.series([
      this.loadTexture.bind(this),
      this.loadShader.bind(this),
      this.main.bind(this)
    ]);
  },
  "loadTexture": function(callback){
    var dis = this,
        canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        imgEarthMap = document.createElement("img");
    imgEarthMap.src = "./img/earth-map.png";
    imgEarthMap.addEventListener("load", function(){
      var w = imgEarthMap.width,
          h = imgEarthMap.height;

      canvas.width = w;
      canvas.height = h;
      
      ctx.drawImage(imgEarthMap, 0, 0, w, h);

      dis.imageDataEarth = ctx.getImageData(0, 0, w, h);
      callback();
    });
    
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
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    var glUtil = new GLUtil(gl);

    var vertexShader = glUtil.getShader(
        document.getElementById("shader-vertex").text,
        gl.VERTEX_SHADER
        );
    var fragmentShader = glUtil.getShader(
        document.getElementById("shader-fragment").text,
        gl.FRAGMENT_SHADER
        );
    var program = gl.createProgram();
    
    glUtil.linkShaders(program, [
      vertexShader,
      fragmentShader
    ]);

    var camera = new Camera(Math.PI/2, canvas.width/canvas.height, 0.1, 100);
    vec3.copy(camera.vPosition, [3.0, 0.0, 0.0]);
    vec3.copy(camera.vLookAt, [0.0, 0.0, 0.0]);
    vec3.copy(camera.vUp, [0.0, 0.0, 1.0]);

    var vertexPosition = [
      -1, -1, -1,
      -1, -1,  1,
      -1,  1, -1,
      -1,  1,  1,
       1, -1, -1,
       1, -1,  1,
       1,  1, -1,
       1,  1,  1
    ];

    var vertexColor = [
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
      1, 0, 0,
    ];

    var indexVertex = [
      //plane 1
     7, 3, 5,
     1, 5, 3,
      //plane 6
     6, 4, 2,
     0, 2, 4,
      //plane 2
     7, 5, 6,
     4, 6, 5,
      //plane 5
     3, 2, 1,
     0, 1, 2,
      //plane 3
     7, 6, 3,
     2, 3, 6,
      //plane 4
     5, 1, 4,
     0, 4, 1,
    ];

    vertexPosition = [];
    vertexColor = [];
    vertexNormal = [];
    indexVertex = [];

    var mRot = mat4.create();
    var vVertex = vec3.create();

    var bunkatsu = 150;

    var imageDataEarth = this.imageDataEarth;
    var data = imageDataEarth.data;

    var x, y, r, g, b, a, c, d;
    for(y=0; y<bunkatsu; y++){
      for(x=0; x<bunkatsu*2; x++){
        mat4.identity(mRot);
        mat4.rotateZ(mRot, mRot, Math.PI/bunkatsu * x);
        mat4.rotateY(mRot, mRot, Math.PI/(bunkatsu-1) * y);
        vec3.copy(vVertex, [0, 0, 1]);
        vec3.transformMat4(vVertex, vVertex, mRot);

        var ix = x/2/bunkatsu * imageDataEarth.width | 0;
        var iy = y/bunkatsu * imageDataEarth.height | 0;
        var dataIndex = 4 * (iy * imageDataEarth.width + ix);
        r = data[dataIndex]/255;
        g = data[dataIndex+1]/255+0.1;
        b = data[dataIndex+2]/255;

        vertexColor.push(r, g, b);
        vec3.scale(vVertex, vVertex, 1+(g-b)*0.2);
        vertexNormal.push.apply(vertexNormal, vVertex);
        vertexPosition.push.apply(vertexPosition, vVertex);
      }
    }
    var x2, y2;
    for(y=0; y<bunkatsu-1; y++){
      for(x=0; x<bunkatsu*2; x++){
        x2 = (x + 1) % (bunkatsu * 2);
        y2 = y + 1;
        a = y * bunkatsu * 2 + x;
        b = y * bunkatsu * 2 + x2;
        c = y2 * bunkatsu * 2 + x;
        d = y2 * bunkatsu * 2 + x2;
        indexVertex.push(
            a, c, b,
            b, c, d
        );
      }
    }
    /*
    indexVertex.push(
      i,i+bunkatsu,i+1
    );
    */

    glUtil.setVBO(program, {
      data: vertexPosition,
      stride: 3,
      name: "position"
    });
    glUtil.setVBO(program, {
      data: vertexColor,
      stride: 3,
      name: "color"
    });
    glUtil.setVBO(program, {
      data: vertexNormal,
      stride: 3,
      name: "normal"
    });
    glUtil.setIBO(program, {
      data: indexVertex
    });

    var uniMP = gl.getUniformLocation(program, "mP");
    var uniMPInv = gl.getUniformLocation(program, "mPInv");
    var uniT = gl.getUniformLocation(program, "t");

    var Rt1 = mat4.create();
    var Rt2 = mat4.create();

    var mPRt1 = mat4.create();
    var mPRt2 = mat4.create();

    var mPInv = mat4.create();
    var mP = mat4.create();

    mat4.translate(Rt1, Rt1, [0, 0, 0]);
    mat4.translate(Rt2, Rt2, [0, -2, 0]);

    new Animation(function(t){
      var rad = t * Math.PI*2 + 0.7;
      camera.vPosition[0] = Math.cos(rad*7) * 9;
      camera.vPosition[1] = Math.sin(rad*7) * 9;
      camera.vPosition[2] = 6;//Math.sin(rad*7) * 9;

      mP = camera.calcMP();
      mat4.identity(Rt1);
      mat4.identity(mPInv);

      mat4.rotateZ(Rt1, Rt1, -t*Math.PI*6);
      mat4.rotateX(Rt1, Rt1, 0.38);

      mat4.mul(mPRt1, mP, Rt1);
      mat4.invert(mPInv, Rt1);

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniformMatrix4fv(uniMP, false, mPRt1);
      gl.uniformMatrix4fv(uniMPInv, false, mPInv);
      gl.uniform1fv(uniT, [t]);
      gl.drawElements(gl.TRIANGLES, indexVertex.length, gl.UNSIGNED_SHORT, 0);

    }, 36000*7,  true).start();     
  }
};
module.exports = App;
