precision mediump float;
varying vec3 position2;
void main(void){
    gl_FragColor = (vec4(position2, 1.0) + vec4(1.0, 1.0 ,1.0 ,1.0)) * 0.5;
}
