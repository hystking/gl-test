attribute vec3 position;
varying vec3 position2;
uniform mat4 mP;

void main(void){
  gl_Position = mP * vec4(position, 1.0);
  position2 = position;
}
