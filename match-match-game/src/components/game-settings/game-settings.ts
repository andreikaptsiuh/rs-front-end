import './game-settings.scss';
import { BaseComponent } from '../base-component';
import { SettingsElement } from './settings-element/settings-element';
import { allSettingsElements } from '../../shared/all-settings-elements';
import { settingsForGame } from '../../shared/settings-for-game';

export class GameSettings extends BaseComponent {
  settingsElements: SettingsElement[] | undefined;

  cardsValueElement!: HTMLElement | null;

  cardsTypeElement!: HTMLElement | null;

  constructor() {
    super('div', ['game-settings']);
    this.render();
  }

  render(): void {
    this.settingsElements = allSettingsElements.map((elem) => new SettingsElement(elem));

    this.settingsElements.forEach((elem) => this.element.append(elem.element));

    this.addSettings();
  }

  addSettings(): void {
    this.cardsValueElement = this.element.querySelector('#cards-value');
    this.cardsTypeElement = this.element.querySelector('#cards-type');

    const cardsValueElement = this.cardsValueElement as HTMLSelectElement;
    const cardsTypeElement = this.cardsTypeElement as HTMLSelectElement;

    if (this.cardsTypeElement !== null && this.cardsValueElement !== null) {
      settingsForGame.cardsValue = cardsValueElement?.options[cardsValueElement.selectedIndex].value;
      settingsForGame.cardsType = cardsTypeElement?.options[cardsTypeElement.selectedIndex].value;

      this.cardsValueElement?.addEventListener('click', () => this.addSettings());
      this.cardsTypeElement?.addEventListener('click', () => this.addSettings());
    }
  }
}
