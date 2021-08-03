import { BaseComponent } from '../../base-component';
import './counter.scss';

export class Counter extends BaseComponent {
  timerId!: ReturnType<typeof setTimeout>;

  timeRight!: number;

  constructor() {
    super('div', ['counter']);
    this.element.innerText = '0';
  }

  startCounter(time: number): void {
    this.timeRight = time;

    this.timerId = setInterval((): void => {
      this.element.innerText = `${this.timeRight}`;
      this.timeRight++;
    }, 1000);
  }

  stopCounter():void {
    clearInterval(this.timerId);
  }

  getTime():number {
    return this.timeRight;
  }
}
