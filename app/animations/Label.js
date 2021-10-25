import GSAP from 'gsap';
import Animation from '../classes/Animation';
import { calculate, split } from '../utils/text';

export default class Label extends Animation {
  constructor({ element }) {
    super({ element });

    split({ element: this.element, append: true });
    this.labelLinesSpans = this.element.querySelectorAll('span');
  }

  animateIn() {
    this.timelineIn = GSAP.timeline();

    this.timelineIn.set(this.element, {
      autoAlpha: 1,
    });

    this.timelineIn.fromTo(
      this.labelLines,
      {
        scale: 1.5,
      },
      {
        duration: 1.5,
        scale: 1,
        ease: 'expo.out',
      },
      0
    );
  }

  animateOut() {
    GSAP.set(this.element, {
      autoAlpha: 0,
    });
  }

  onResize() {
    this.labelLines = calculate(this.labelLinesSpans);
  }
}
