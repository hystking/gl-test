attribute vec3 position;
attribute vec3 normal;
attribute vec3 color;

varying vec3 vLightInv; 
varying vec3 vColor;
varying vec3 vNormal;

uniform mat4 mP;
uniform mat4 mPInv;
uniform float t;

void main(void){
  vec3 position2 = position * 5.
    + position * clamp(color[2]-color[1], 0., 1.) * 
      pow(
       sin(position.z * 20. - t * 300.)
      +sin(position.x * 40. + t * 600.)
      +sin(position.y * 60. - t * 900.)
      , 4.) * .02;
  vNormal = normalize(position2);
  vColor = color;
  vLightInv = normalize(mPInv * vec4(1, 1, 1, 1)).xyz;
  gl_Position = mP * vec4(position2, 1.);
}
