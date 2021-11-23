import { Program, Mesh, Texture } from 'ogl';
import vertex from 'shaders/plane-vertex.glsl';
import fragment from 'shaders/plane-fragment.glsl';

export default class Media {
  constructor({ element, gl, geometry, index, scene }) {
    this.element = element;
    this.gl = gl;
    this.geometry = geometry;
    this.index = index;
    this.scene = scene;

    this.createTexture();
    this.createProgram();
    this.createMesh();
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: this.texture },
      },
    });
  }

  createTexture() {
    this.texture = new Texture(this.gl);
    this.image = new Image();
    this.image.crossOrigin = 'anonymous';
    this.image.src = this.element.getAttribute('data-src');
    this.image.onload = () => (this.texture.image = this.image);
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.mesh.setParent(this.scene);
    this.mesh.position.x = this.index * this.mesh.scale.x;
  }
}
