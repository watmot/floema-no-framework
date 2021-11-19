import GSAP from 'gsap';
import Component from './Component';
export default class Button extends Component {
  constructor({ element }) {
    super({ element });
    this.createTimeline();
  }

  createTimeline() {
    this.timeline = GSAP.timeline({ paused: true });
    this.path = this.element.querySelector('path:last-child');
    this.pathLength = this.path.getTotalLength();

    this.timeline.fromTo(
      this.path,
      {
        strokeDasharray: `${this.pathLength} ${this.pathLength}`,
        strokeDashoffset: this.pathLength,
      },
      {
        strokeDasharray: `${this.pathLength} ${this.pathLength}`,
        strokeDashoffset: 0,
      }
    );
  }

  onMouseEnter() {
    this.timeline.play();
  }

  onMouseLeave() {
    this.timeline.reverse();
  }

  addEventListeners() {
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);

    this.element.addEventListener('mouseenter', this.onMouseEnter);
    this.element.addEventListener('mouseleave', this.onMouseLeave);
  }

  removeEventListeners() {
    this.element.removeEventListener('mouseenter', this.onMouseEnter);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
  }

  destroy() {
    this.timeline.kill();
    this.removeEventListeners();
  }
}
