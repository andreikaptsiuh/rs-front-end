import './router.scss';
import { BaseComponent } from '../base-component';
import { GaragePage } from '../garage-page/garage-page';
import { WinnersPage } from '../winners-page/winners-page';

const DISABLE_BTN = 'disabled';

export class Router extends BaseComponent {
  garagePage!: GaragePage;

  winnersPage: WinnersPage;

  private routerItems!: NodeListOf<Element>;

  private appFieldElement!: HTMLElement | null;

  pages!: HTMLElement[];

  constructor(garagePage: GaragePage) {
    super('nav', ['router']);
    this.element.innerHTML = `
      <button class="router__item disabled" num="0"/> To garage </button>
      <button class="router__item" num="1"> To winners </button>
    `;
    this.garagePage = garagePage;
    this.winnersPage = new WinnersPage();
  }

  onRouting(): void {
    this.appFieldElement = document.getElementById('app');

    this.routerItems = document.querySelectorAll('.router__item');
    this.routerItems.forEach((elem) => {
      elem.addEventListener('click', () => {
        if (!elem.classList.contains(DISABLE_BTN)) {
          this.addPage(elem as HTMLElement);
          this.removePage();
          this.onBtn(elem as HTMLElement);
        }
      });
    });
  }

  removePage(): void {
    const oldPage = this.appFieldElement?.firstChild;
    if (this.appFieldElement && oldPage) this.appFieldElement.removeChild(oldPage);
  }

  addPage(elem: HTMLElement): void {
    this.pages = [
      this.garagePage.element,
      this.winnersPage.element,
    ];

    const newPageIndex = elem.getAttribute('num');
    if (!newPageIndex) throw Error('Found null');

    this.appFieldElement?.appendChild(this.pages[+newPageIndex]);
  }

  onBtn(elem: HTMLElement): void {
    this.routerItems.forEach((item) => item.classList.remove(DISABLE_BTN));
    elem.classList.add(DISABLE_BTN);
  }
}
