import GSAP from 'gsap';
import { each } from 'lodash';
import Animation from '../classes/Animation';
import { calculate, split } from '../utils/text';

export default class Title extends Animation {
  constructor({ element }) {
    super({ element });

    split({ element: this.element, append: true });
    split({ element: this.element, append: true });
    this.titleLinesSpans = this.element.querySelectorAll('span span');
  }

  animateIn() {
    this.timelineIn = GSAP.timeline();

    this.timelineIn.set(this.element, {
      autoAlpha: 1,
    });

    each(this.titleLines, (line, index) => {
      this.timelineIn.fromTo(
        line,
        {
          y: '100%',
        },
        {
          delay: 0.5 + index * 0.2,
          duration: 1.5,
          y: '0%',
          ease: 'expo.out',
        },
        0
      );
    });
  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0,
    });
  }

  onResize() {
    this.titleLines = calculate(this.titleLinesSpans);
  }
}
