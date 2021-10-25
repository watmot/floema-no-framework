import Component from './Component';

export default class Button extends Component {
  constructor({ element, elements }) {
    super({ element, elements });
  }

  addEventListeners() {
    addEventListener('mouseenter', () => console.log('mouseenter'));
    addEventListener('mouseenter', () => console.log('mouseleave'));
  }

  removeEventListeners() {
    removeEventListener('mouseenter', () => console.log('mouseenter'));
    removeEventListener('mouseenter', () => console.log('mouseleave'));
  }
}
