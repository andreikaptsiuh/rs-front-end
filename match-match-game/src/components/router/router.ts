import './router.scss';
import { BaseComponent } from '../base-component';
import { AboutGame } from '../about-games/about-game';
import { BestScore } from '../best-score/best-score';
import { GameSettings } from '../game-settings/game-settings';
import { Game } from '../game/game';

export class Router extends BaseComponent {
  private routerItems!: NodeList;

  private startStopGameBtn!: HTMLElement | null;

  private appFieldElement!: HTMLElement | null;

  aboutGame: AboutGame;

  bestScore: BestScore;

  gameSettings: GameSettings;

  game: Game;

  constructor() {
    super('nav', ['router']);
    this.element.innerHTML = `
      <a class="router__item active" name="about-game" num="0">
        <div class="router__item_about"></div>
        <p>About Game</p>
      </a>
      <a class="router__item" name="best-score" id="best-score" num="1">
        <div class="router__item_best"></div>
        <p>Best Score</p>
      </a>
      <a class="router__item" name="game-settings" num="2">
        <div class="router__item_settings"></div>
        <p>Game Settings</p>
      </a>
    `;
    this.aboutGame = new AboutGame();
    this.bestScore = new BestScore();
    this.gameSettings = new GameSettings();
    this.game = new Game();
  }

  onRouting():void {
    this.routerItems = document.querySelectorAll('.router__item');

    this.startStopGameBtn = document.querySelector('.header__start-stop_button');

    Array.from(this.routerItems).forEach((elem) => {
      elem.addEventListener('click', () => {
        this.changeCurrentPage(elem as HTMLElement);
      });
    });

    if (!this.startStopGameBtn) throw Error('hop');
    this.startStopGameBtn.onclick = () => {
      this.changeCurrentPage(this.startStopGameBtn as HTMLElement);
      this.game.preStart();
    };
  }

  changeCurrentPage(elem: HTMLElement): void {
    if (elem.classList.contains('header__start-stop_button')) {
      elem.onclick = null;
    }

    this.removePage();
    this.addPage(elem);
    this.onBtn(elem);
  }

  onBtn(elem: HTMLElement):void {
    this.routerItems.forEach((item) => {
      (item as HTMLElement).classList.remove('active');
    });
    elem.classList.add('active');
  }

  removePage():void {
    let oldPageName = Array.from(this.routerItems).find((item) => (item as HTMLElement).classList.contains('active'));

    if (oldPageName === undefined && this.startStopGameBtn) {
      oldPageName = this.startStopGameBtn;
      this.startStopGameBtn.onclick = () => {
        this.changeCurrentPage(this.startStopGameBtn as HTMLElement);
        this.game.preStart();
      };
    }

    const pageForDelete = document.querySelector(`.${(oldPageName as HTMLElement).getAttribute('name')}`);

    this.appFieldElement = document.getElementById('app');
    if (pageForDelete) this.appFieldElement?.removeChild(pageForDelete);
  }

  addPage(elem: HTMLElement): void {
    const pages = [
      this.aboutGame.element,
      this.bestScore.element,
      this.gameSettings.element,
      this.game.element,
    ];
    const newPageIndex = elem.getAttribute('num');
    if (!newPageIndex) throw Error('Found null');
    this.appFieldElement?.appendChild(pages[+newPageIndex]);
    if (pages[+newPageIndex] === this.bestScore.element) this.bestScore.render();
  }
}
