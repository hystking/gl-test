var AttributeSetter = function(gl, program){
  this.gl = gl;
  this.program = program;
};

AttributeSetter.prototype = {
  "setVertex": function(params){
    var gl = this.gl,
        program = this.program,
        alPosition, i, l;
    for(i=0, l=params.length; i<l; i++){
      var p = params[i];
      gl.bindBuffer(gl.ARRAY_BUFFER, p.vbo);
      alPosition = gl.getAttribLocation(program, p.name);
      gl.enableVertexAttribArray(alPosition);
      gl.vertexAttribPointer(alPosition, p.stride, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
  }
};

module.exports = AttributeSetter;
