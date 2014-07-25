var glMatrix = require("gl-matrix"),
    vec3 = glMatrix.vec3,
    mat4 = glMatrix.mat4;

var Camera = function(fov, aspectRatio, nearClip, farClip){
  this.fov = fov === undefined ? Math.PI/2 : fov;
  this.aspectRatio = aspectRatio === undefined ? 1 : aspectRatio;
  this.nearClip = nearClip === undefined ? 0.1 : nearClip;
  this.farClip = farClip === undefined ? 100 : farClip;
  this.vPosition = vec3.clone([1.0, 0.0, 0.0]);
  this.vLookAt = vec3.clone([0.0, 0.0, 0.0]);
  this.vUp = vec3.clone([0.0, 0.0, 1.0]);
  this.mA = mat4.create();
  this.mRt = mat4.create();
  this.mP = mat4.create();
};

Camera.prototype = {
  "calcMP": function(){
    var mA = this.mA,
        mRt = this.mRt,
        mP = this.mP;
    //console.log(this.vUp);
    mat4.lookAt(mRt, this.vPosition, this.vLookAt, this.vUp);
    mat4.perspective(mA, this.fov, this.aspectRatio, this.nearClip, this.farClip);
    //console.log(mP);
    mat4.mul(mP, mA, mRt);
    return mP;
  }
};

module.exports = Camera;
