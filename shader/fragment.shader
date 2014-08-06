precision mediump float;

varying vec3 vLightInv;
varying vec3 vColor;
varying vec3 vNormal;

void main(void){
  float s = dot(vNormal , vLightInv);
  gl_FragColor = vec4(
      vColor * clamp(s, 0.1, 1.) +
      s*s*s*s * vec3(.9, .8, .5)
      , 1.);
}
