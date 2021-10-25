import GSAP from 'gsap';
import Prefix from 'prefix';
import NormalizeWheel from 'normalize-wheel';
import { each, map } from 'lodash';
import Title from '../animations/Title';
import Paragraph from '../animations/Paragraph';
import Label from '../animations/Label';
import { ColorManager } from './Colors';
import ImagePreloader from './ImagePreloader';

export default class Page {
  constructor({ element, elements, id }) {
    this.id = id;
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationsTitles: '[data-animation="title"]',
      animationsParagraphs: '[data-animation="paragraph"]',
      animationsLabels: '[data-animation="label"]',
      imageSrc: '[data-src]',
    };
    this.transformPrefix = Prefix('transform');
    this.onMouseWheel = this.onMouseWheel.bind(this);
    this.update = this.update.bind(this);

    console.log(this.id);
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    this.backgroundColor = this.element.getAttribute('data-background-color');
    this.color = this.element.getAttribute('data-color');

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof window.HTMLElement || entry instanceof window.NodeList || Array.isArray(entry)) {
        this.elements[key] = entry;
      } else {
        this.elements[key] = document.querySelectorAll(entry);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key].length === 1) {
          this.elements[key] = document.querySelector(entry);
        }
      }
    });

    this.scrollValues = {
      current: 0,
      target: 0,
      last: 0,
      limit: 0,
    };

    this.createAnimations();
    this.onResize();
  }

  createAnimations() {
    this.animationsTitles = map(this.elements.animationsTitles, element => {
      return new Title({
        element,
      });
    });

    this.animationsParagraphs = map(this.elements.animationsParagraphs, element => {
      return new Paragraph({ element });
    });

    this.animationsLabels = map(this.elements.animationsLabels, element => {
      return new Label({ element });
    });
  }

  createImagePreloader() {
    this.imagePreloaders = map(this.elements.imageSrc, element => {
      return new ImagePreloader({ element });
    });
  }

  show() {
    return new Promise(resolve => {
      this.animateIn = GSAP.timeline();

      ColorManager.change({ backgroundColor: this.backgroundColor, color: this.color });

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
        this.addEventListeners();
        resolve();
      });
    });
  }

  hide() {
    return new Promise(resolve => {
      this.removeEventListeners();
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

  onResize() {
    if (this.elements.wrapper) {
      this.scrollValues.limit = this.elements.wrapper.clientHeight - innerHeight;
    }
    each(this.animationsTitles, title => title.onResize());
    each(this.animationsParagraphs, paragraph => paragraph.onResize());
    each(this.animationsLabels, label => label.onResize());
  }

  onMouseWheel(event) {
    const { pixelY } = NormalizeWheel(event);
    const clamper = GSAP.utils.clamp(0, this.scrollValues.limit);

    this.scrollValues.target = clamper(this.scrollValues.target + pixelY);
  }

  update() {
    this.scrollValues.current = GSAP.utils.interpolate(this.scrollValues.current, this.scrollValues.target, 0.1);

    if (this.scrollValues.current < 0.1) {
      this.scrollValues.current = 0;
    }

    if (this.elements.wrapper) {
      this.elements.wrapper.style[this.transformPrefix] = `translateY(-${this.scrollValues.current}px)`;
    }
  }

  addEventListeners() {
    addEventListener('mousewheel', this.onMouseWheel.bind(this));
    addEventListener('resize', this.onResize.bind(this));
  }

  removeEventListeners() {
    removeEventListener('mousewheel', this.onMouseWheel.bind(this));
    removeEventListener('resize', this.onResize.bind(this));
  }
}
