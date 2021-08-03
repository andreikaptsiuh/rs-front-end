import './cards-board.scss';
import { BaseComponent } from '../../base-component';
import { Card } from '../card/card';

export const SHOW_TIME = 30;

export class CardsBoard extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['cards-board']);
  }

  clear(): void {
    this.cards = [];
    this.element.innerHTML = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => this.element.appendChild(card.element));

    setTimeout(() => {
      cards.forEach((card) => card.flipToBack());
    }, SHOW_TIME * 1000);
  }
}
