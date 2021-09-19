import { each } from 'lodash';
import Preloader from './components/Preloader';
import About from './pages/About';
import Collections from './pages/Collections';
import Detail from './pages/Detail';
import Home from './pages/Home';

class App {
  constructor() {
    this.createPreloader();
    this.createContent();
    this.createPages();
    this.addLinkListeners();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded);
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  async createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    };

    this.page = this.pages[this.template];
    this.page.create();
    await this.page.show();
  }

  onPreloaded() {
    console.log('Preloaded');
  }

  async onChange(url) {
    const response = await fetch(url);

    if (response.status === 200) {
      // Hide the current page
      await this.page.hide();

      // Create new page content from response
      const html = await response.text();
      const div = document.createElement('div');
      div.innerHTML = html;
      const divContent = div.querySelector('.content');
      this.template = divContent.getAttribute('data-template');
      this.content.innerHTML = divContent.innerHTML;
      this.content.setAttribute('data-template', this.template);

      // Create and show the new page
      this.page = this.pages[this.template];
      this.page.create();
      this.addLinkListeners();
      await this.page.show();
    } else {
      console.log(`${response.status} error.`);
    }
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a');

    each(links, link => {
      link.onclick = e => {
        e.preventDefault();
        const { href } = link;
        this.onChange(href);
      };
    });
  }
}

new App();
