import { each } from 'lodash';
import Navigation from './components/Navigation';
import Preloader from './components/Preloader';
import About from './pages/About';
import Collections from './pages/Collections';
import Detail from './pages/Detail';
import Home from './pages/Home';

class App {
  constructor() {
    this.createContent();
    this.createPreloader();
    this.createNavigation();
    this.createPages();
    this.addEventListeners();
    this.addLinkListeners();
    this.onResize();
    this.update();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded.bind(this));
  }

  createNavigation() {
    this.navigation = new Navigation({ template: this.template });
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = {
      about: new About(),
      collections: new Collections(),
      detail: new Detail(),
      home: new Home(),
    };

    this.page = this.pages[this.template];
    this.page.create();
  }

  async onPreloaded() {
    this.preloader.destroy();
    await this.page.show();
    await this.navigation.show();
  }

  onPopState() {
    this.onChange(window.location.pathname);
  }

  async onChange(url) {
    const response = await fetch(url);

    if (response.status === 200) {
      // Hide the current page
      await this.navigation.hide();
      await this.page.hide();

      // Create new page content from response
      const html = await response.text();
      const div = document.createElement('div');
      div.innerHTML = html;
      const divContent = div.querySelector('.content');
      this.template = divContent.getAttribute('data-template');
      this.navigation.onChange(this.template);
      this.content.innerHTML = divContent.innerHTML;
      this.content.setAttribute('data-template', this.template);
      window.history.pushState({}, '', url);

      // Create and show the new page
      this.page = this.pages[this.template];
      this.page.create();
      this.page.createImagePreloader();
      this.addLinkListeners();
      await this.page.show();
      await this.navigation.show();
      this.onResize();
    } else {
      console.log(`${response.status} error.`);
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    this.frame = requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this));
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

const app = new App();
