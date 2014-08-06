attribute vec3 position;
attribute vec3 normal;
attribute vec3 color;
varying vec3 vColor;
uniform mat4 mP;
uniform mat4 mPInv;

void main(void){
  /*
  gl_Position = mP * vec4(
      position * (1. + .1 * sin(position.z*20.))
      , 1);
   */
  vec3 invLight = normalize(mPInv * vec4(1, 1, 1, 1)).xyz;
  gl_Position = mP * vec4(position*5., 1);
  float s = dot(normal , invLight);
  vColor = color * clamp(s, 0.1, 1.) + s*s*0.2 + 0.;
}
