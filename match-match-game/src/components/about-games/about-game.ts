import './about-game.scss';
import { BaseComponent } from '../base-component';

export class AboutGame extends BaseComponent {
  constructor() {
    super('div', ['about-game']);
    this.element.innerHTML = `
          <div class="about-game__title">How to play?</div>
          <div class="about-game__reg">
            <div class="description"></div>
            <div class="visual"></div>
          </div>

          <div class="about-game__configurate">
            <div class="description"></div>
            <div class="visual"></div>
          </div>

          <div class="about-game__start">
            <div class="description"></div>
            <div class="visual"></div>
          </div>
    `;
  }
}
