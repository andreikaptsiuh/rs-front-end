import './best-score__item.scss';
import { BaseComponent } from '../../base-component';

export class BestScoreItem extends BaseComponent {
  constructor(user: { firstName: string, lastName: string, email: string, score: number }) {
    super('div', ['best-score__item']);
    this.element.innerHTML = `
      <div class="best-score__item_avatar"></div>
      <div class="best-score__item_about-user">
        <div class="best-score__item_about-user_name"> ${user.firstName} ${user.lastName}</div>
        <div class="best-score__item_about-user_email"> ${user.email} </div>
      </div>
      <div class="best-score__item_score"> Score: ${user.score}</div>
    `;
  }
}
