import './garage-pagination.scss';
import { BaseComponent } from '../../base-component';
import { allAuto } from '../../../shared/all-auto';
import { AutoTrack } from './auto-track/auto-track';
import { getCar, getCars } from '../../../shared/for-server';
import { AutoUpdate } from '../auto-settings-panel/auto-update';
import { Pagination } from '../../pagination/pagination';

const TRACK_ITEMS_CLASS = 'auto-track';

export class GaragePagination extends BaseComponent {
  allTracks!: AutoTrack[];

  pagination!: Pagination;

  prevBtn!: HTMLButtonElement;

  nextBtn!: HTMLButtonElement;

  title: HTMLHeadingElement;

  constructor() {
    super('div', ['all-auto-pagination']);
    this.element.id = 'garage-pagination';
    this.title = document.createElement('h3');
  }

  async render(): Promise<void> {
    this.title.innerText = 'Page (1)';
    this.element.append(this.title);

    await getCars();

    this.allTracks = allAuto.map((auto) => new AutoTrack(auto));
    this.allTracks.forEach((track) => this.element.append(track.element));

    this.addEvents();

    const prevBtn = document.createElement('button');
    prevBtn.innerText = 'Prev';
    prevBtn.classList.add('pagination__button', 'pagination__button_prev');

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.classList.add('pagination__button', 'pagination__button_next');

    this.element.append(prevBtn, nextBtn);
    this.pagination = new Pagination(prevBtn, nextBtn, TRACK_ITEMS_CLASS, this.title, 7);
  }

  addEvents(): void {
    const allRemoveTrackBtns = document.querySelectorAll('#remove-track-btn');
    const allSelectTrackBtns = document.querySelectorAll('#select-track-btn');

    allRemoveTrackBtns.forEach((elem, index) => {
      elem.addEventListener('click', () => this.allTracks[index].remove());
    });

    allSelectTrackBtns.forEach((elem, index) => {
      elem.addEventListener('click', () => AutoUpdate.startUpdate(this.allTracks[index]));
    });
  }

  static async addNewTrack(field: Element): Promise<void> {
    await getCars().then(async () => {
      const lastAutoId = allAuto[allAuto.length - 1].id;
      const newCar = await getCar(lastAutoId);

      const newTrack = new AutoTrack(newCar as unknown as { name: string; color: string; id: number; });

      field.append(newTrack.element);

      const removeTrackBtns = newTrack.element.querySelector('#remove-track-btn');
      const selectTrackBtns = newTrack.element.querySelector('#select-track-btn');

      removeTrackBtns?.addEventListener('click', () => newTrack.remove());
      selectTrackBtns?.addEventListener('click', () => AutoUpdate.startUpdate(newTrack));

      Pagination.checkBtns();
      Pagination.showItems();
    });
  }
}
