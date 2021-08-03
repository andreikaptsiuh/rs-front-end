import { allWinnersAuto } from '../../../shared/all-auto';
import { BaseComponent } from '../../base-component';
import { Pagination } from '../../pagination/pagination';
import { WinnerAuto } from './winner-auto/winner-auto';
import './winners-pagination.scss';

const WINNERS_AUTO_CLASS = 'winner-auto';

export class WinnersPagination extends BaseComponent {
  winnersItems!: WinnerAuto[] | undefined;

  pagination!: Pagination;

  title: HTMLHeadingElement;

  constructor() {
    super('div', ['winners-pagination']);
    this.title = document.createElement('h3');
    this.element.innerHTML = `
      <div class="winners-pagination__page_head">
        <p>Number</p>
        <p>Car</p>
        <p>Name</p>
        <p>Wins</p>
        <p>Best time(seconds)</p>
      </div>
    `;
    this.render();
  }

  render(): void {
    this.title.innerText = 'Page (1)';
    this.element.append(this.title);

    this.winnersItems = allWinnersAuto.map((auto, index) => new WinnerAuto(auto, index + 1));
    this.winnersItems.forEach((track) => this.element.append(track.element));

    const prevBtn = document.createElement('button');
    prevBtn.innerText = 'Prev';
    prevBtn.classList.add('pagination__button', 'pagination__button_prev');

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.classList.add('pagination__button', 'pagination__button_next');

    this.element.append(prevBtn, nextBtn);
    this.pagination = new Pagination(prevBtn, nextBtn, WINNERS_AUTO_CLASS, this.title, 10);
  }

  static addNewWinner(): void {}
}
