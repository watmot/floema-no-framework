import GSAP from 'gsap';
import Component from './Component';

export default class ImagePreloader extends Component {
  constructor({ element }) {
    super({ element });
    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!this.element.src) {
            this.element.src = this.element.getAttribute('data-src');
            this.element.onload = () => {
              this.element.classList.add('loaded');
            };
          }
        }
      });
    });

    this.observer.observe(this.element);
  }
}
