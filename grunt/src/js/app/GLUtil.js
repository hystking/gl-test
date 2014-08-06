var GLUtil = function(gl){
  this.gl = gl;
};
GLUtil.prototype = {
  "setIBO": function(program, param){
    var gl = this.gl,
        type = gl.ELEMENT_ARRAY_BUFFER,
        ibo;
    ibo = gl.createBuffer();
    gl.bindBuffer(type, ibo);
    gl.bufferData(type, new Int16Array(param.data), gl.STATIC_DRAW);
  },
  "setVBO": function(program, param){
    var gl = this.gl,
        type = gl.ARRAY_BUFFER,
        al, vbo;
    vbo = gl.createBuffer();
    gl.bindBuffer(type, vbo);
    gl.bufferData(type, new Float32Array(param.data), gl.STATIC_DRAW);
    al = gl.getAttribLocation(program, param.name);
    gl.enableVertexAttribArray(al);
    gl.vertexAttribPointer(al, param.stride, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(type, null);
  },
  "linkShaders": function(program, shaders){
    var gl = this.gl,
        i, l;
    for(i=0, l=shaders.length; i<l; i++){
      gl.attachShader(program, shaders[i]);
    }
    gl.linkProgram(program);
    if(gl.getProgramParameter(program, gl.LINK_STATUS)){
      gl.useProgram(program);
      return program;
    }
    console.log("program link failed");
    console.log(gl.getProgramInfoLog(program));
    return null;
  },
  "getShader": function(textSource, type){
    var gl = this.gl,
        shader = gl.createShader(type);
    gl.shaderSource(shader, textSource);
    gl.compileShader(shader);
    if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)){
      return shader;
    }
    console.log("compile failed");
    console.log(gl.getShaderInfoLog(shader));
    return null;
  }
};
module.exports = GLUtil;
