import './winners-page.scss';
import { BaseComponent } from '../base-component';
import { WinnersPagination } from './winners-pagination/winners-pagination';
import { allWinnersAuto } from '../../shared/all-auto';
import { getWinners } from '../../shared/for-server';

export class WinnersPage extends BaseComponent {
  winnersPagination!: WinnersPagination;

  constructor() {
    super('div', ['winners-page']);
    this.render();
  }

  async render(): Promise<void> {
    await getWinners();
    this.element.innerHTML = `
      <h2>Winners page (${allWinnersAuto.length})</h2>
    `;
    this.winnersPagination = new WinnersPagination();
    this.element.append(this.winnersPagination.element);
  }
}
