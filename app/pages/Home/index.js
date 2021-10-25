import Page from '../../classes/Page';

export default class Home extends Page {
  constructor() {
    super({
      id: 'Home',
      element: '.home',
      elements: {
        navigation: document.querySelector('.navigation'),
        button: '.home__button',
        wrapper: '.home__wrapper',
      },
    });
  }

  onMouseEnter(e) {
    console.log(e);
    if (e.target === this.elements.button) {
      console.log('mouseenter');
    }
  }

  onMouseLeave(e) {
    if (e.target === this.elements.button) {
      console.log('mouseleave');
    }
  }

  addEventListeners() {
    super.addEventListeners();
    this.element.addEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.element.addEventListener('mouseleave', this.onMouseLeave.bind(this));
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.element.removeEventListener('mouseenter', this.onMouseEnter.bind(this));
    this.element.removeEventListener('mouseleave', this.onMouseLeave.bind(this));
  }
}
