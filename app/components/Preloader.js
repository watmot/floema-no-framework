import { each } from 'lodash';
import Component from '../classes/Component';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        number: '.preloader__number',
        images: document.querySelectorAll('img'),
      },
    });
    this.length = 0;
    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, element => {
      const image = new Image();
      image.onload = () => this.onAssetLoaded(image);
      image.src = element.getAttribute('data-src');
      console.log(image);
    });
  }

  onAssetLoaded(image) {
    this.length += 1;
    const percent = Math.floor((this.length / this.elements.images.length) * 100);
    this.elements.number.innerHTML = `${percent}%`;

    if (percent === 100) {
      this.emit('completed');
    }
  }
}
