import './card.scss';
import { BaseComponent } from '../../base-component';

const FLIP_CLASS = 'flipped';

export class Card extends BaseComponent {
  isFlipped = false;

  image: string;

  constructor(image: string) {
    super('div', ['card-container']);
    this.image = image;
    this.element.innerHTML = `
      <div class="card">
        <div class="card__front" style="background-image: url(./images/${image})"></div>
        <div class="card__back"></div>
      </div>
    `;
  }

  flipToFront(): void {
    this.isFlipped = false;
    this.element.classList.remove(FLIP_CLASS);
  }

  flipToBack(): void {
    this.isFlipped = true;
    this.element.classList.add(FLIP_CLASS);
  }
}
