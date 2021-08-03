import './registration.scss';
import { BaseComponent } from '../base-component';
import { logIn } from '../header/header_func';

export class Registration extends BaseComponent {
  private inputItems!: HTMLCollection;

  private registrationCancelBtn!: HTMLElement | null;

  private addUserBtn!: HTMLElement | null;

  constructor() {
    super('div', ['registration', 'open']);
    this.element.innerHTML = `
    <div class="registration__field">
        <div class="registration__field_head">
          <div class="registration__title">Registr new Player</div>
        </div>
        <div class="registration__field_body">
          <form class="registration__items" action="">
            <div class="input__container" name="First Name">
              <input class="input__container_item" type="text" required />
            </div>
            <div class="input__container" name="Last Name">
              <input class="input__container_item" type="text" required />
            </div>
            <div class="input__container" name="E-mail">
              <input
                class="input__container_item"
                type="email"
                id=""
                required
              />
            </div>

            <input class="registration__items_submit" type="button" value="Add user"></input>
          </form>

          <div class="avatar"></div>

          <button class="cancel__button">Cancel</button>
        </div>
      </div>
    `;
    this.inputItems = document.getElementsByClassName('input__container_item');
  }

  validateInputs(): void {
    for (let i = 0; i < this.inputItems.length; i++) {
      this.inputItems[i].addEventListener('input', (): void => {
        const parent: HTMLElement | null = this.inputItems[i].parentElement;

        if (parent?.getAttribute('name') === 'E-mail') {
          this.validateEmail(this.inputItems[i] as HTMLInputElement);
        } else this.validateName(this.inputItems[i] as HTMLInputElement);
      });
    }
  }

  validateName(input: HTMLInputElement): void {
    const re = /^([А-яё]{1,30}|[A-z]{1,30})$/;

    if (!this.inputItems) throw Error('inputs not found');

    const inputValue = input.value;

    if (re.test(inputValue)) {
      input.parentElement?.classList.add('valid');
    } else input.parentElement?.classList.remove('valid');
  }

  validateEmail(input: HTMLInputElement): void {
    const re = /\S+@\S+\.\S+/;

    if (!this.inputItems) throw Error('Input is not found');

    const inputValue = input.value;

    if (re.test(inputValue)) {
      input.parentElement?.classList.add('valid');
    } else input.parentElement?.classList.remove('valid');
  }

  registrationCancel(): void {
    this.registrationCancelBtn = document.querySelector('.cancel__button');

    this.registrationCancelBtn?.addEventListener('click', ():void => {
      this.clearInputs();
      this.element.parentNode?.removeChild(this.element);
    });
  }

  clearInputs(): void {
    Array.from(this.inputItems).forEach((element) => {
      (element as HTMLInputElement).value = '';
      element.parentElement?.classList.remove('valid');
    });
  }

  addUser(user: { firstName: string; lastName: string; email: string; }): void {
    this.addUserBtn = document.querySelector('.registration__items_submit');

    this.addUserBtn?.addEventListener('click', () => {
      if (this.checkInputs()) {
        user.firstName = (this.inputItems[0] as HTMLInputElement).value;
        user.lastName = (this.inputItems[1] as HTMLInputElement).value;
        user.email = (this.inputItems[2] as HTMLInputElement).value;

        const header: HTMLElement | null = document.querySelector('.header');

        this.element.classList.remove('open');

        logIn(header);
      }
    });
  }

  checkInputs(): boolean {
    let result = true;
    Array.from(this.inputItems).forEach((item): void => {
      if (!item.parentElement?.classList.contains('valid')) result = false;
    });
    return result;
  }
}
