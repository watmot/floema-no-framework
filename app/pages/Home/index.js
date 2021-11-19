import Page from '../../classes/Page';
import Button from '../../classes/Button';
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

  create() {
    super.create();
    this.collectionsButton = new Button({ element: this.elements.button });
  }
}
