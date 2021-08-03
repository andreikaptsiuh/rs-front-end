import './header.scss';
import { BaseComponent } from '../base-component';
import { Registration } from '../registration/registration';
import { user } from '../../shared/user';
import { Router } from '../router/router';

export class Header extends BaseComponent {
  private readonly router: Router;

  private routerField!: HTMLElement | null;

  private readonly registration: Registration;

  private regBtn!: HTMLElement|null;

  constructor(private body: HTMLElement) {
    super('header', ['header']);
    this.element.innerHTML = `
    <div class="header__logo">
      <div class="header__logo_top"></div>
      <div class="header__logo_bottom"></div>
    </div>
    <div class="router-container"></div>
    <button class="header__registration_button">Register new player</button>
    <button class="header__start-stop_button" name ="game" num="3">Start game</button>
    <div class="header__avatar"></div>
    `;
    this.router = new Router();
    this.registration = new Registration();
  }

  registrationOn():void {
    this.regBtn = document.querySelector('.header__registration_button');

    this.regBtn?.addEventListener('click', (): void => {
      this.body?.appendChild(this.registration.element);
      this.registration.registrationCancel();
      this.registration.validateInputs();
      this.registration.addUser(user);
    });
  }

  render(): void {
    this.routerField = document.querySelector('.router-container');
    this.routerField?.appendChild(this.router.element);
    this.router.onRouting();
  }
}
