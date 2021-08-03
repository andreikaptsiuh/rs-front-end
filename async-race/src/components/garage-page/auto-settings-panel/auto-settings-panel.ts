import './auto-settings-panel.scss';
import { BaseComponent } from '../../base-component';
import { AutoCreate } from './auto-create';
import { AutoUpdate } from './auto-update';
import { AutoButtonsField } from './auto-buttons-field';

export class AutoSettingsPanele extends BaseComponent {
  createBtn!: HTMLElement | null;

  updateBtn!: HTMLElement | null;

  raceBtn!: HTMLElement | null;

  resetBtn!: HTMLElement | null;

  generateBtn!: HTMLElement | null;

  autoCreate: AutoCreate;

  autoUpdate: AutoUpdate;

  autoButtonsField: AutoButtonsField;

  constructor() {
    super('div', ['auto-create']);
    this.autoCreate = new AutoCreate();
    this.autoUpdate = new AutoUpdate();
    this.autoButtonsField = new AutoButtonsField();
  }

  render() : void {
    this.element.appendChild(this.autoCreate.element);
    this.element.appendChild(this.autoUpdate.element);
    this.element.appendChild(this.autoButtonsField.element);

    this.addEvents();
  }

  addEvents(): void {
    this.createBtn = document.querySelector('#create-btn');
    this.updateBtn = document.querySelector('#update-btn');
    this.raceBtn = document.querySelector('#race-btn');
    this.resetBtn = document.querySelector('#reset-btn');
    this.generateBtn = document.querySelector('#generate-btn');

    if (!this.createBtn || !this.updateBtn || !this.raceBtn || !this.resetBtn || !this.generateBtn) return;

    this.createBtn.onclick = () => this.autoCreate.createNewCar();
    this.updateBtn.onclick = () => AutoUpdate.updateAutoTrack();
    this.raceBtn.onclick = () => this.autoButtonsField.preRace();
    this.resetBtn.onclick = () => this.autoButtonsField.resetAuto();
    this.generateBtn.onclick = () => this.autoButtonsField.generateAutos();
  }
}
