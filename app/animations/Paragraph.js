import GSAP from 'gsap';
import { each } from 'lodash';
import Animation from '../classes/Animation';
import { calculate, split } from '../utils/text';

export default class Paragraph extends Animation {
  constructor({ element }) {
    super({ element });

    split({ element: this.element });

    this.paragraphLinesSpans = this.element.querySelectorAll('p span');
  }

  animateIn() {
    each(this.paragraphLines, (line, index) => {
      GSAP.fromTo(
        line,
        {
          autoAlpha: 0,
          y: '100%',
        },
        {
          autoAlpha: 1,
          delay: 1.5 + index * 0.2,
          duration: 1,
          y: '0%',
          ease: 'expo.out',
        },
        0
      );
    });
  }

  animateOut() {
    each(this.paragraphLines, line => {
      GSAP.set(line, {
        autoAlpha: 0,
      });
    });
  }

  onResize() {
    this.paragraphLines = calculate(this.paragraphLinesSpans);
  }
}
