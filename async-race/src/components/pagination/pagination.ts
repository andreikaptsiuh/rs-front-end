import './pagination.scss';

const DISPLAY_NONE_ELEMENT = 'display_none';

export class Pagination {
  static nextBtn: HTMLButtonElement;

  static prevBtn: HTMLButtonElement;

  static position: number;

  static itemsClassName: string;

  static allItems: NodeListOf<Element>;

  static paginationTitle: HTMLElement;

  static page = 1;

  static itemsMax: number;

  constructor(prevBtn: HTMLButtonElement, nextBtn: HTMLButtonElement,
    itemsClassName: string, paginationTitle: HTMLElement, itemsMax: number) {
    Pagination.nextBtn = nextBtn;
    Pagination.prevBtn = prevBtn;
    Pagination.itemsMax = itemsMax;

    Pagination.position = 0;
    Pagination.itemsClassName = itemsClassName;
    Pagination.paginationTitle = paginationTitle;

    Pagination.addEvents();
    Pagination.showItems();
    Pagination.checkBtns();
  }

  private static openNext(): void {
    if (!this.checkMaxPosition()) {
      this.page++;
      this.paginationTitle.innerText = `Page (${this.page})`;
      this.position += this.itemsMax;
      this.showItems();
      this.checkBtns();
    }
  }

  static openPrev(): void {
    if (this.position !== 0) {
      this.page--;
      this.paginationTitle.innerText = `Page (${this.page})`;
      this.position -= 7;
      this.showItems();
      this.checkBtns();
    }
  }

  static async checkBtns(): Promise<void> {
    this.nextBtn.disabled = false;
    this.prevBtn.disabled = false;

    if (this.position === 0) this.prevBtn.disabled = true;
    if (this.checkMaxPosition()) this.nextBtn.disabled = true;
  }

  static checkMaxPosition(): boolean {
    this.allItems = document.querySelectorAll(`.${this.itemsClassName}`);
    const maxPosition = this.allItems.length;

    if (maxPosition - this.position <= this.itemsMax) return true;
    return false;
  }

  static addEvents(): void {
    this.nextBtn.onclick = () => this.openNext();
    this.prevBtn.onclick = () => this.openPrev();
  }

  static showItems(): void {
    this.allItems = document.querySelectorAll(`.${this.itemsClassName}`);
    this.allItems.forEach((elem) => elem.classList.add(DISPLAY_NONE_ELEMENT));

    for (let i = this.position; i < this.position + this.itemsMax; i++) {
      if (this.allItems[i] === undefined) break;
      this.allItems[i].classList.remove(DISPLAY_NONE_ELEMENT);
    }
  }
}
