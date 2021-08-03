import { AboutGame } from './components/about-games/about-game';
import { DataBase } from './components/data-base';
import { Header } from './components/header/header';

export class App {
  private readonly header: Header;

  private readonly aboutGame: AboutGame;

  dataBase: DataBase;

  constructor(private rootElement: HTMLElement, private body: HTMLElement) {
    this.aboutGame = new AboutGame();
    this.header = new Header(this.body);
    this.dataBase = new DataBase();
  }

  render(): void {
    this.rootElement.appendChild(this.aboutGame.element);
    this.body.appendChild(this.header.element);
    this.header.registrationOn();
    this.header.render();
  }
}
