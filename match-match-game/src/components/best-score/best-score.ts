import './best-score.scss';
import { BaseComponent } from '../base-component';
import { BestScoreItem } from './best-score__item/best-score__item';
import { allUsers } from '../../shared/user';

export class BestScore extends BaseComponent {
  static addToScore(): void {
    const bestScorePage = document.querySelector('.best-score');
    if (!bestScorePage) throw Error('Best score page is not found');

    const allBestScoreItems: BestScoreItem[] = allUsers.map((item) => new BestScoreItem(item));
    allBestScoreItems.forEach((elem) => bestScorePage.appendChild(elem.element));
  }

  constructor() {
    super('div', ['best-score']);
    this.element.innerHTML = `
      <div class="best-score__title">Best players</div>
    `;
  }

  render(): void {
    if (this.element.childElementCount <= allUsers.length) {
      this.element.innerHTML = `
      <div class="best-score__title">Best players</div>
    `;
      const allBestScoreItems: BestScoreItem[] = allUsers.map((item) => new BestScoreItem(item));
      allBestScoreItems.forEach((elem) => this.element.appendChild(elem.element));
    }
  }
}
