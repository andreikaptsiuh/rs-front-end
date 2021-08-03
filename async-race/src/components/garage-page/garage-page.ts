import './garage-page.scss';
import { BaseComponent } from '../base-component';
import { AutoSettingsPanele } from './auto-settings-panel/auto-settings-panel';
import { GaragePagination } from './garage-pagination/garage-pagination';
import { allAuto } from '../../shared/all-auto';
import { getCars } from '../../shared/for-server';

export class GaragePage extends BaseComponent {
  autoCreate!: AutoSettingsPanele;

  garagePagination!: GaragePagination;

  constructor() {
    super('div', ['garage-page']);
    this.render();
  }

  async render(): Promise<void> {
    await getCars();
    this.element.innerHTML = `
      <h2>Garage page (${allAuto.length})</h2>
    `;
    this.autoCreate = new AutoSettingsPanele();
    this.garagePagination = new GaragePagination();

    this.element.append(this.autoCreate.element);
    this.element.append(this.garagePagination.element);

    this.autoCreate.render();
    this.garagePagination.render();
  }
}
