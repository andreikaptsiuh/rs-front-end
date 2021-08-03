import { GaragePage } from './components/garage-page/garage-page';
import { Router } from './components/router/router';

export class App {
  garagePage: GaragePage;

  router: Router;

  constructor(private rootElement: HTMLElement, private body: HTMLElement) {
    this.garagePage = new GaragePage();
    this.router = new Router(this.garagePage);
  }

  render():void {
    this.body.appendChild(this.router.element);
    this.rootElement.appendChild(this.garagePage.element);
    this.router.onRouting();
  }
}
