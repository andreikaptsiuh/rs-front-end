import './settings-element.scss';
import { BaseComponent } from '../../base-component';

export class SettingsElement extends BaseComponent {
  constructor(settingsElements: { title: string, inputElement: string }) {
    super('div', ['settings-element']);
    this.element.innerHTML = `
      <h6 class="settings-element__title"> ${settingsElements.title}</h6>
      ${settingsElements.inputElement}
    `;
  }
}
