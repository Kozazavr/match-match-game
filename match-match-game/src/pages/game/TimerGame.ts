import Selectors from '../../utils/selectors';

export default class TimerGame {
  milliseconds: number;

  timer: NodeJS.Timeout;

  constructor() {
    this.milliseconds = 0;
  }

  static getWatch() {
    const watch = document.querySelector(Selectors.Watch);
    return watch;
  }

  static getTimer() {
    const timerContainer = document.createElement('div');
    timerContainer.classList.add(Selectors.TimerContainerAdd);
    timerContainer.insertAdjacentHTML(
      'afterbegin',
      '<p class="watch">00:00</p>',
    );
    return timerContainer;
  }

  startTimer() {
    TimerGame.getWatch().classList.remove('paused');
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      this.milliseconds += 10;
      const dataTimer = new Date(this.milliseconds);
      TimerGame.getWatch().innerHTML = ('0' + dataTimer.getUTCMinutes()).slice(-2)
        + ':'
        + ('0' + dataTimer.getUTCSeconds()).slice(-2);
    }, 10);
  }

  pausedTimer() {
    TimerGame.getWatch().classList.remove('paused');
    clearInterval(this.timer);
  }

  resetTimer() {
    this.milliseconds = 0;
    clearInterval(this.timer);
  }
}
