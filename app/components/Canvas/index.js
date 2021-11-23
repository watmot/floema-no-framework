import { Renderer, Camera, Transform, Box, Program, Mesh } from 'ogl';
import Home from './Home';

export default class Canvas {
  constructor() {
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.createHome();
  }

  createRenderer() {
    this.renderer = new Renderer();
    this.gl = this.renderer.gl;
    document.body.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.z = 5;
  }

  createScene() {
    this.scene = new Transform();
  }

  createHome() {
    this.home = new Home({
      gl: this.gl,
      scene: this.scene,
    });
  }

  onResize() {
    if (this.home && this.home.onResize) {
      this.home.onResize();
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  update() {
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
}
