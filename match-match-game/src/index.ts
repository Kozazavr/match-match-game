import './index.css';
import headerHtml from './components/header/header';
import about from './pages/about/about';
import GameField from './pages/game/GameField';
import setting from './pages/settings/settings';
import Router from './components/Router';
import Popup from './components/popup/Popup';
import TableInfo from './utils/tableinfo';
import HeaderAvatar from './components/header/HeaderAvatar';
import TimerGame from './pages/game/TimerGame';
import Score from './pages/score/Score';
import FormValidator from './components/FormValidation';
import Selectors from './utils/selectors';

let db: IDBDatabase;

const openRequest = indexedDB.open('kozazavr', 1);

openRequest.onerror = function Error() {
  console.error;
  db = openRequest.result;
};

openRequest.onsuccess = function Success() {
  db = openRequest.result;
};

openRequest.onupgradeneeded = () => {
  db = openRequest.result;
  if (!db.objectStoreNames.contains('users')) {
    const store = db.createObjectStore('users', {
      keyPath: 'id',
      autoIncrement: true,
    });
    store.createIndex('email', 'email', { unique: true });
    store.createIndex('score', 'score');
  }
};

function addUser(user: TableInfo) {
  const transaction = db.transaction('users', 'readwrite');
  const users = transaction.objectStore('users');
  const request = users.add(user);

  request.onsuccess = () => {};

  request.onerror = () => {
    console.error;
  };
}

function addScoreUser(score: number) {
  const users = db.transaction('users', 'readwrite').objectStore('users');
  const request = users.getAll();

  request.onsuccess = () => {
    interface UserData {
      [index: number]: string;
      score: number;
    }
    const arr: Array<UserData> = request.result;
    const currentUser = arr[arr.length - 1];
    if (currentUser.score < score) {
      currentUser.score = score;
      users.put(currentUser);
    }
  };

  request.onerror = () => {
    console.error;
  };
}

function scoreTable() {
  const users = db.transaction('users', 'readonly').objectStore('users');
  const request = users.index('score').openCursor(null, 'prev');
  let count = 0;
  const limit = 10;
  request.onsuccess = () => {
    const cursor = request.result;
    if (cursor && count < limit) {
      let scoreForTable: number = cursor.value.score;
      if (!scoreForTable) {
        scoreForTable = 0;
      }
      const getScore = new Score(
        cursor.value.name,
        cursor.value.lastname,
        cursor.value.email,
        cursor.value.avatar,
        scoreForTable,
      ).getScoreTable();
      const listItem = document.createElement('li');
      listItem.classList.add(Selectors.ListItem);
      listItem.innerHTML = getScore;
      const main = document.querySelector(Selectors.Main);
      const scoreHtml = document.querySelector(Selectors.Score);

      scoreHtml.append(listItem);
      main.append(scoreHtml);
      count += 1;
      cursor.continue();
    }
  };
}

const root = document.querySelector(Selectors.Root);
root.innerHTML = headerHtml;
const headerWrapper = document.querySelector(Selectors.headerWrapper);
const score = Score.getScoreTitle();
const route = new Router(about, score, setting);

window.addEventListener('load', () => {
  if (window.location.hash) {
    route.location(window.location.hash);
  } else {
    route.getStartPage();
  }
});

const linkAbout = document.querySelector(Selectors.HeaderLinkAbout);
const linkScore = document.querySelector(Selectors.HeaderLinkScore);
const linkSetting = document.querySelector(Selectors.HeaderLinkSettings);

const registerButton = document.querySelector(Selectors.HeaderButtonRegister);
const startButton = document.querySelector(Selectors.HeaderButtonStart);
const stopButton = document.querySelector(Selectors.HeaderButtonStop);
const continueButton = document.querySelector(Selectors.HeaderButtonContinue);

const timer = new TimerGame();

function resetGame() {
  if (registerButton.classList.contains(Selectors.Invisible)) {
    startButton.classList.remove(Selectors.Invisible);
    stopButton.classList.add(Selectors.Invisible);
    continueButton.classList.add(Selectors.Invisible);
  }
}

function switchBestScorePage() {
  route.location('#/best_score/');
  scoreTable();
  linkScore.parentElement.classList.add(Selectors.HeaderLinkBlock);
  linkAbout.parentElement.classList.remove(Selectors.HeaderLinkBlock);
  linkSetting.parentElement.classList.remove(Selectors.HeaderLinkBlock);
}

linkAbout.addEventListener('click', () => {
  route.location('#/');
  linkAbout.parentElement.classList.add(Selectors.HeaderLinkBlock);
  linkScore.parentElement.classList.remove(Selectors.HeaderLinkBlock);
  linkSetting.parentElement.classList.remove(Selectors.HeaderLinkBlock);
  resetGame();
  timer.resetTimer();
});

linkScore.addEventListener('click', () => {
  switchBestScorePage();
  resetGame();
  timer.resetTimer();
});

let difficultyGame = 6;
let typeCard = 'spider';

linkSetting.addEventListener('click', () => {
  route.location('#/settings/');
  linkSetting.parentElement.classList.add(Selectors.HeaderLinkBlock);
  linkAbout.parentElement.classList.remove(Selectors.HeaderLinkBlock);
  linkScore.parentElement.classList.remove(Selectors.HeaderLinkBlock);

  resetGame();
  timer.resetTimer();

  const typeCards = document.querySelector(
    Selectors.SelectCard,
  ) as HTMLSelectElement;
  const diffGame = document.querySelector(
    Selectors.SelectDifficulty,
  ) as HTMLSelectElement;
  typeCards.addEventListener('change', () => {
    typeCard = typeCards.value;
  });
  diffGame.addEventListener('change', () => {
    difficultyGame = Number(diffGame.value);
  });
});

const avatar: string = require('./assets/popup__avatar.png');

const popup = document.createElement('section');

registerButton.addEventListener('click', () => {
  popup.innerHTML = new Popup(avatar).getPopupHtml();
  document.body.append(popup);

  const cancelPopup = document.querySelector(
    Selectors.PopupButtonCancel,
  ) as HTMLElement;
  cancelPopup.addEventListener('click', () => {
    popup.remove();
  });

  const form = document.querySelector(
    Selectors.PopupContainer,
  ) as HTMLFormElement;

  const inputAvatar: HTMLSourceElement = document.querySelector(
    Selectors.PopupAvatar,
  );
  const buttonAddAvatar: HTMLInputElement = document.querySelector(
    Selectors.PopupButtonAddAvatar,
  );

  buttonAddAvatar.addEventListener('change', () => {
    const reader = new FileReader();
    reader.onload = function () {
      const newSrc = reader.result;
      inputAvatar.src = String(newSrc);
    };
    reader.readAsDataURL(buttonAddAvatar.files[0]);
  });

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    const user = new TableInfo();
    const inputName = document.querySelector(Selectors.UserName) as HTMLInputElement;
    const inputLastname = document.querySelector(
      Selectors.UserLastName,
    ) as HTMLInputElement;
    const inputEmail = document.querySelector(Selectors.UserEmail) as HTMLInputElement;

    user.name = inputName.value;
    user.lastname = inputLastname.value;
    user.email = inputEmail.value;
    user.avatar = inputAvatar.src;
    user.score = 0;

    addUser(user);
    registerButton.classList.add(Selectors.Invisible);
    startButton.classList.remove(Selectors.Invisible);
    const avatarComponent = new HeaderAvatar(user.avatar).getAvatar();
    headerWrapper.append(avatarComponent);
    popup.remove();
  });

  const validatePopupProfile = new FormValidator(
    Selectors.PopupInput,
    Selectors.PopupButtonAdd,
    Selectors.PopupButtonAddBlock,
    Selectors.PopupInputError,
    Selectors.PopupErrorText,
    form,
  );
  validatePopupProfile.enableValidation();
});

startButton.addEventListener('click', () => {
  const main = document.querySelector(Selectors.Main);
  main.firstElementChild.remove();
  const game = new GameField(difficultyGame, typeCard).setField();
  main.append(TimerGame.getTimer());
  main.append(game);
  startButton.classList.add(Selectors.Invisible);
  stopButton.classList.remove(Selectors.Invisible);

  const cards = document.querySelectorAll(Selectors.CardContainer);
  setTimeout(() => {
    cards.forEach((card) => {
      card.classList.remove(Selectors.Flip);
    });
  }, 3000);

  let hasFlippedCard = false;
  let lockCards = false;
  let firstCard: HTMLElement;
  let secondCard: HTMLElement;
  let moves: number = 0;
  let rightMoves: number = 0;

  function flipCard(this: HTMLElement) {
    if (lockCards) return;
    if (this === firstCard) return;

    this.classList.add(Selectors.Flip);

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;

    checkForMatch();
  }

  function checkForMatch() {
    const first = firstCard.lastChild as HTMLImageElement;
    const second = secondCard.lastChild as HTMLImageElement;
    moveCounter();
    if (first.src === second.src) {
      setTimeout(() => {
        firstCard.classList.add('card-right');
        secondCard.classList.add('card-right');

        rightMoves += 1;
        if (rightMoves === difficultyGame) {
          timer.pausedTimer();
          setTimeout(() => {
            let time = document.querySelector(Selectors.Watch).innerHTML;
            time = time.replace(':', '.').slice(1, time.length);
            popup.innerHTML = Popup.getPopupWin(time);
            document.body.append(popup);

            const seconds = time.split('.');
            const secondScore = Number(seconds[0]) * 60 + Number(seconds[1]);
            let gameScore = difficultyGame * 100 - secondScore * 10;
            if (gameScore < 0) gameScore = 0;
            addScoreUser(gameScore);

            const buttonScore = document.querySelector(Selectors.PopupLink);
            buttonScore.addEventListener('click', () => {
              popup.remove();
              switchBestScorePage();
              timer.resetTimer();
            });
          }, 400);
        }
        disableCards();
      }, 300);
      return;
    }
    unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
  }

  function unflipCards() {
    lockCards = true;
    setTimeout(() => {
      firstCard.classList.add('card-wrong');
      secondCard.classList.add('card-wrong');
    }, 300);

    setTimeout(() => {
      firstCard.classList.remove(Selectors.Flip);
      secondCard.classList.remove(Selectors.Flip);
      firstCard.classList.remove('card-wrong');
      secondCard.classList.remove('card-wrong');
      resetBoard();
    }, 800);
  }

  function resetBoard() {
    [hasFlippedCard, lockCards] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  cards.forEach((card) => card.addEventListener('click', flipCard));

  function moveCounter() {
    moves += 1;
    if (moves === 1) {
      timer.startTimer();
    }
  }
});

stopButton.addEventListener('click', () => {
  timer.pausedTimer();
  stopButton.classList.add(Selectors.Invisible);
  continueButton.classList.remove(Selectors.Invisible);
  const cards = document.querySelectorAll(Selectors.CardContainer);
  cards.forEach((card) => {
    card.classList.add(Selectors.Disabled);
  });
});

continueButton.addEventListener('click', () => {
  timer.startTimer();
  continueButton.classList.add(Selectors.Invisible);
  stopButton.classList.remove(Selectors.Invisible);
  const cards = document.querySelectorAll(Selectors.CardContainer);
  cards.forEach((card) => {
    card.classList.remove(Selectors.Disabled);
  });
});
