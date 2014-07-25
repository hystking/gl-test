var VBOManager = function(gl){
  this.gl = gl;
};
VBOManager.prototype = {
  "create": function(data){
    var gl = this.gl,
        vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  }
};
module.exports = VBOManager;
