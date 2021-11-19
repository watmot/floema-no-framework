import Button from '../../classes/Button';
import Page from '../../classes/Page';

export default class Detail extends Page {
  constructor() {
    super({
      id: 'Detail',
      element: '.detail',
      elements: {
        button: '.detail__close__button',
      },
    });
  }

  create() {
    super.create();
    this.closeButton = new Button({ element: this.elements.button });
  }
}
