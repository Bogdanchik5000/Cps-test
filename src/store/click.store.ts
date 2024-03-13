import BigNumber from "bignumber.js";
import { makeAutoObservable } from "mobx";

export class ClickStore {
  timer = BigNumber(1);
  clicks = 0;
  isActive = false;
  isTimerEnd = false;

  constructor() {
    makeAutoObservable(this);
  }

  setTimer = (value: number) => {
    this.timer = BigNumber(value);
  };

  changeTimer = (value: number) => {
    if ((+this.timer === 1 && value === -1) || this.isTimerEnd) return;
    this.timer = this.timer.plus(value);
  };

  toggle = (type: "isActive" | "isTimerEnd") => {
    this[type] = !this[type];
  };

  incrClicks = () => {
    this.clicks += 1;
  };

  decrTimer = () => {
    this.timer = this.timer.minus(0.01);
  };

  reset = (timer: number) => {
    this.timer = BigNumber(timer);
    this.clicks = 0;
    this.isActive = false;
    this.isTimerEnd = false;
  };
}

export default new ClickStore();
