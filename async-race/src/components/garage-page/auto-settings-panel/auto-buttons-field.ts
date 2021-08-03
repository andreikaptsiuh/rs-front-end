import './auto-settings-panel.scss';
import { BaseComponent } from '../../base-component';
import { createCar } from '../../../shared/for-server';
import { GaragePagination } from '../garage-pagination/garage-pagination';
import { AutoTrack } from '../garage-pagination/auto-track/auto-track';
import { carsBrends, carsNamed } from '../../../shared/all-auto';

export class AutoButtonsField extends BaseComponent {
  event = new Event('click');

  garagePaginationElement!: HTMLElement | null;

  color!: string;

  constructor() {
    super('div', ['auto-create__buttons']);
    this.element.innerHTML = `
      <button id="race-btn"> Race </button>
      <button id="reset-btn"> Reset </button>
      <button id="generate-btn"> Generate cars </button>
    `;
  }

  async generateAutos() : Promise<void> {
    this.garagePaginationElement = document.querySelector('#garage-pagination');

    for (let i = 0; i < 100; i++) {
      const name = this.generateName(i);
      const color = this.generateColor();

      // eslint-disable-next-line no-await-in-loop
      await this.createCars(name, color);
    }

    AutoTrack.updateGaragePageCars();
  }

  generateName = (i: number) : string => {
    const index = i;
    return `${carsBrends[index % carsBrends.length]} ${carsNamed[index % carsNamed.length]}`;
  };

  generateColor = (): string => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    return `#${`${String(r) + String(g) + String(b)}`.slice(0, 6)}`;
  };

  async createCars(named: string, rgb: string) : Promise<void> {
    const newCar = {
      name: named,
      color: rgb,
    };

    await createCar(newCar);

    if (!this.garagePaginationElement) throw Error('garagePaginationElement is not found');
    GaragePagination.addNewTrack(this.garagePaginationElement);
  }

  resetAuto() : void {
    const allTrack = document.querySelectorAll('.auto-track');

    allTrack.forEach((track) => {
      if (!track.classList.contains('display_none')) {
        const elemResetBtn = <HTMLButtonElement>track.querySelector('#stopBtn');
        if (elemResetBtn && !elemResetBtn.disabled) elemResetBtn.dispatchEvent(this.event);
      }
    });
  }

  preRace(): void {
    const allTrack = document.querySelectorAll('.auto-track');

    allTrack.forEach((track) => {
      if (!track.classList.contains('display_none')) {
        this.race(track as HTMLElement);
      }
    });
  }

  race(track: HTMLElement): void {
    const elemStartBtn = track.querySelector('#startBtn');
    if (elemStartBtn) elemStartBtn.dispatchEvent(this.event);
  }
}
