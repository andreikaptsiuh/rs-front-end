import './game.scss';
import { BaseComponent } from '../base-component';
import { Counter } from './counter/counter';
import { CardsBoard, SHOW_TIME } from './cards-board/cards-board';
import { Card } from './card/card';
import { delay } from '../../shared/delay';
import { ImageCategoryModel } from '../../models/image_category_models';
import { user } from '../../shared/user';
import { settingsForGame } from '../../shared/settings-for-game';
import { DataBase } from '../data-base';

const FLIP_DELAY = 1000;

export class Game extends BaseComponent {
  counter: Counter;

  cardsBoard: CardsBoard;

  private activCard?: Card;

  private allCards!: Card[];

  private isAnimation = false;

  private startStopBtn!: HTMLElement | null;

  trueClick: number;

  falseClick: number;

  dataBase: DataBase;

  constructor() {
    super('div', ['game']);
    this.counter = new Counter();
    this.cardsBoard = new CardsBoard();
    this.dataBase = new DataBase();
    this.element.appendChild(this.counter.element);
    this.element.appendChild(this.cardsBoard.element);
    this.trueClick = 0;
    this.falseClick = 0;
  }

  async preStart(): Promise<void> {
    const res = await fetch('./images.json').then((response) => response.json());
    const categories: ImageCategoryModel[] = res;

    const cat = categories.find((elem) => elem.category === settingsForGame.cardsType);
    if (cat === undefined) throw Error('Cards category = undefined');
    const images = cat.images.map((name: unknown) => `${cat.category}/${name}`);
    images.length = +settingsForGame.cardsValue / 2;

    this.startGame(images);

    this.startStopBtn = document.querySelector('.header__start-stop_button');
    if (this.startStopBtn) {
      this.startStopBtn.onclick = null;
      this.startStopBtn.innerHTML = 'Stop game';
      this.startStopBtn.onclick = () => this.stopGame();
    }
  }

  startGame(images: string[]): void {
    this.cardsBoard.clear();
    this.allCards = images.concat(images).map((url) => new Card(url)).sort(() => Math.random() - 0.5);

    this.allCards.forEach((card) => card.element.addEventListener('click', () => {
      this.cardHandler(card);
    }));

    this.cardsBoard.addCards(this.allCards);

    setTimeout(() => {
      this.counter.startCounter(0);
    }, SHOW_TIME * 1000);
  }

  async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation) return;
    if (!card.isFlipped) return;
    this.isAnimation = true;

    await card.flipToFront();

    if (!this.activCard) {
      this.activCard = card;
      this.isAnimation = false;
      return;
    }

    if (this.activCard.image !== card.image) {
      this.falseClick++;
      await delay(FLIP_DELAY);

      await Promise.all([this.activCard.flipToBack(), card.flipToBack()]);
    } else this.trueClick++;

    this.activCard = undefined;
    this.isAnimation = false;

    let end = true;
    this.allCards.forEach((item) => {
      if (item.isFlipped === true) end = false;
    });

    if (end) {
      this.stopGame();
      this.finishGame();
    }
  }

  stopGame(): void {
    this.counter.stopCounter();

    if (this.startStopBtn) {
      this.startStopBtn.onclick = null;
      this.startStopBtn.innerHTML = 'Start game';
      this.startStopBtn.onclick = () => this.preStart();
    }
  }

  finishGame():void {
    const gameTime = this.counter.getTime();
    user.gameTime = gameTime - 1;
    user.score = (this.trueClick - this.falseClick) * 100 - (gameTime - 1) * 10;

    if (user.score < 0) user.score = 0;

    this.trueClick = 0;
    this.falseClick = 0;

    const event = new Event('click');
    const bestScorePage = document.getElementById('best-score');

    this.dataBase.addUser();

    setTimeout(() => {
      bestScorePage?.dispatchEvent(event);
      alert(`Congratulations! You successfully found all matches on ${gameTime - 1} seconds.`);
    }, FLIP_DELAY);
  }
}
