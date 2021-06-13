import './score.css';

export default class Score {
  name: string;

  lastname: string;

  email: string;

  avatar: string;

  score: number;

  constructor(
    name: string,
    lastname: string,
    email: string,
    avatar: string,
    score: number,
  ) {
    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.avatar = avatar;
    this.score = score;
  }

  static getScoreTitle() {
    return `<section class="score">
    <h2 class="score__title-page">Best players</h2>
    </section>`;
  }

  getScoreTable() {
    return `
      <div class="user__container">
        <img src="${this.avatar}" class="avatar">
        <div class="container__info">
          <p class="name">${this.name}</p>
          <p class="lastname">${this.lastname}</p>
          <p class="email">${this.email}</p>
        </div>
      </div>
      <div class="score__container">
        <p class="score__title">Score:</p>
        <p class="score">${this.score}</p>
      </div>`;
  }
}
