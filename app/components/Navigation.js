import GSAP from 'gsap';
import Component from '../classes/Component';

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.navigation',
      elements: {
        links: '.navigation__list__link',
        items: '.navigation__list__item',
      },
    });
    this.onChange(template);
  }

  onChange(template) {
    if (template === 'about') {
      GSAP.to(this.elements.links[0], {
        display: 'inline',
      });

      GSAP.to(this.elements.links[1], {
        display: 'none',
      });
    } else {
      GSAP.to(this.elements.links[0], {
        display: 'none',
      });

      GSAP.to(this.elements.links[1], {
        display: 'inline',
      });
    }
  }
  show() {
    return new Promise(resolve => {
      this.animateIn = GSAP.timeline();

      this.animateIn.fromTo(
        this.element,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        }
      );

      this.animateIn.call(() => {
        resolve();
      });
    });
  }

  hide() {
    return new Promise(resolve => {
      this.animateIn = GSAP.timeline();

      this.animateIn.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });

      this.animateIn.call(() => {
        resolve();
      });
    });
  }
}
