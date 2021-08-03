import './auto-settings-panel.scss';
import { BaseComponent } from '../../base-component';
import { AutoTrack } from '../garage-pagination/auto-track/auto-track';

export class AutoUpdate extends BaseComponent {
  createBtn!: HTMLElement | null;

  static updateNameInput: HTMLInputElement | null;

  static updateColorInput: HTMLInputElement | null;

  static auto: { name: string; color: string; id: number; };

  static track: AutoTrack;

  constructor() {
    super('div', ['auto-create__update']);
    this.element.innerHTML = `
      <input id="update-name-input" type="text">
      <input id="update-color-input" type="color" value="#ffffff">
      <button id="update-btn"> Update </button>
    `;
  }

  static async updateAutoTrack(): Promise<void> {
    if (!this.updateNameInput || !this.updateColorInput) return;

    if (this.updateNameInput.value !== '') {
      this.auto.name = this.updateNameInput.value;
      this.auto.color = this.updateColorInput.value;
      this.track.update(this.auto);

      this.updateNameInput.value = '';
      this.updateColorInput.value = '#ffffff';
    }
  }

  static startUpdate(track: AutoTrack): void {
    this.track = track;
    this.auto = track.auto;

    this.updateNameInput = document.querySelector('#update-name-input');
    this.updateColorInput = document.querySelector('#update-color-input');

    if (!this.updateNameInput || !this.updateColorInput) return;

    this.updateNameInput.value = track.auto.name;
    this.updateColorInput.value = track.auto.color;
  }
}
