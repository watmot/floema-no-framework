import { each } from 'lodash';
import GSAP from 'gsap';
import Component from '../classes/Component';
import { split } from '../utils/text';

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

    this.splitTitle();
    this.elements.titleSpans = this.elements.title.querySelectorAll('span');
    this.createLoader();
  }

  splitTitle() {
    split({
      element: this.elements.title,
      expression: '<br>',
    });
  }

  createLoader() {
    each(this.elements.images, element => {
      element.onload = () => {
        element.classList.add('loaded');
        this.onAssetLoaded(element);
      };
      element.src = element.getAttribute('data-src');
    });
  }

  onAssetLoaded() {
    this.length += 1;
    const percent = Math.floor((this.length / this.elements.images.length) * 100);
    this.elements.number.innerHTML = `${percent}%`;

    if (percent === 100) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise(resolve => {
      this.animateOut = GSAP.timeline({
        delay: 1,
      });

      this.animateOut.to(this.elements.titleSpans, {
        autoAlpha: 0,
        stagger: 0.1,
        y: '-100%',
        duration: 1.5,
        ease: 'expo.out',
      });

      this.animateOut.to(
        this.elements.number,
        {
          autoAlpha: 0,
          stagger: 0.1,
          y: '-100%',
          duration: 1.5,
          ease: 'expo.out',
        },
        '-=1.5'
      );

      this.animateOut.to(
        this.element,
        {
          duration: 1.5,
          ease: 'expo.out',
          scaleY: 0,
          transformOrigin: '100% 100%',
        },
        '-=1'
      );

      this.animateOut.call(() => {
        this.emit('completed');
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
