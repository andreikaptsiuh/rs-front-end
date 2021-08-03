import './auto-settings-panel.scss';
import { BaseComponent } from '../../base-component';
import { createCar } from '../../../shared/for-server';
import { GaragePagination } from '../garage-pagination/garage-pagination';
import { AutoTrack } from '../garage-pagination/auto-track/auto-track';

export class AutoCreate extends BaseComponent {
  newCarNameInput!: HTMLInputElement | null;

  newCarColorInput!: HTMLInputElement | null;

  garagePagination!: GaragePagination;

  static garageTitleElement: HTMLHeadingElement | null;

  constructor() {
    super('div', ['auto-create__create']);
    this.element.innerHTML = `
      <input id="newCar-name-input" type="text">
      <input id="newCar-color-input" type="color" value="#ffffff">
      <button id="create-btn"> Create </button>
    `;
  }

  async createNewCar(): Promise<void> {
    this.newCarNameInput = document.querySelector('#newCar-name-input');
    this.newCarColorInput = document.querySelector('#newCar-color-input');

    if (!this.newCarNameInput || !this.newCarColorInput) return;

    const newCarName = this.newCarNameInput?.value;
    const newCarColor = this.newCarColorInput?.value;

    const newCar = {
      name: newCarName,
      color: newCarColor,
    };

    const garagePaginationElement = document.querySelector('#garage-pagination');
    if (!garagePaginationElement) throw Error('garagePaginationElement not found');

    await createCar(newCar);
    this.clearInputs();

    GaragePagination.addNewTrack(garagePaginationElement);
    AutoTrack.updateGaragePageCars();
  }

  clearInputs(): void {
    if (this.newCarNameInput && this.newCarColorInput) {
      this.newCarNameInput.value = '';
      this.newCarColorInput.value = '#ffffff';
    }
  }
}
