var ShaderCompiler = function(gl){
  this.gl = gl;
};
ShaderCompiler.prototype = {
  "compile": function(textSource, type){
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
module.exports = ShaderCompiler;
