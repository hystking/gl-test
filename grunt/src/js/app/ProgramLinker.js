var ProgramLinker = function(gl){
  this.gl = gl;
};
ProgramLinker.prototype = {
  "link": function(shaders){
    var i, l, gl = this.gl;
    var program = gl.createProgram();
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
  }
};
module.exports = ProgramLinker;
