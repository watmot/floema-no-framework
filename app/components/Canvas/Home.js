import { map } from 'lodash';
import { Plane, Transform } from 'ogl';
import Media from './Media';

export default class Home {
  constructor({ gl, scene }) {
    this.gl = gl;
    this.createGroup();
    this.createGeometry();
    this.createGallery();
    this.group.setParent(scene);
  }

  createGroup() {
    this.group = new Transform();
  }

  createGeometry() {
    this.geometry = new Plane(this.gl);
  }

  createGallery() {
    const images = document.querySelectorAll('.home__gallery__media__image');
    map(images, (element, index) => {
      return new Media({
        element,
        gl: this.gl,
        geometry: this.geometry,
        index,
        scene: this.group,
      });
    });
  }
}
