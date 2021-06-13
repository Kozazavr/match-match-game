import Selectors from '../utils/selectors';

const root = document.querySelector(Selectors.Root);
const main = document.createElement('main');
main.classList.add('main');

export default class Router {
  about: string;

  score: string;

  setting: string;

  constructor(about: string, score: string, setting: string) {
    this.about = about;
    this.score = score;
    this.setting = setting;
  }

  getStartPage() {
    main.innerHTML = this.about;
    root.append(main);
  }

  private routes() {
    interface RoutesMap {
      [index: string]: string;
    }
    const routes: RoutesMap = {
      '#/': this.about,
      '#/best_score/': this.score,
      '#/settings/': this.setting,
    };
    return routes;
  }

  location(hash: string) {
    for (const key in this.routes()) {
      if (key === hash) {
        if (key === '#/settings/') {
          main.classList.add('background__white');
          main.innerHTML = this.routes()[key];
        } else {
          main.innerHTML = this.routes()[key];
        }
      }
    }
    return root.append(main);
  }
}
