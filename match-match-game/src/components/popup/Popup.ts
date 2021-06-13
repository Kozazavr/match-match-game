export default class Popup {
  avatar: string;

  openPopup: Element;

  constructor(a: string) {
    this.avatar = a;
  }

  getPopupHtml() {
    return `<section class="popup">
        <form class="popup__container" name="donateForm" id="donateForm">
          <h2 class="popup__title">Register new Player</h2>
          <div class="popup__inputs">
            <div class="popup__inputs-container">
              <div class="popup__input-container">
                <div class="popup__input-label">
                  <label class="popup__input-title" for="username">First Name</label>
                  <input id="username" type="text" class="popup__input popup__input_username required" minlength="2"
                    maxlength="30" name="popup_username" autocomplete="off" pattern="[A-Za-z-А-я]+" placeholder="John" required>
                  <span id="username-error" class="popup__error"></span>
                </div>
                <input id="username-checkbox" class="popup__checkbox" type="checkbox">
              </div>

              <div class="popup__input-container">
                <div class="popup__input-label">
                  <label class="popup__input-title" for="userlastname">Last Name</label>
                  <input id="userlastname" type="text" class="popup__input popup__input_userlastname required" minlength="2"
                  maxlength="30" name="popup_uuserlastname" autocomplete="off" pattern="[A-Za-z-А-я]+" placeholder="Doe" required>
                  <span id="userlastname-error" class="popup__error"></span>
                </div>
                <input id="userlastname-checkbox" class="popup__checkbox" type="checkbox">
              </div>

              <div class="popup__input-container">
                <div class="popup__input-label">
                  <label class="popup__input-title" for="useremail">E-mail</label>
                  <input id="useremail" type="email" class="popup__input popup__input_useremail required" minlength="2"
                  maxlength="30" name="popup_useremail" autocomplete="off" pattern="^[A-Za-z0-9_.+%-]+@[A-Za-z0-9_.-]+\\.[A-Za-z]{2,4}$" placeholder="John.Doe@gmail.com" required>
                  <span id="useremail-error" class="popup__error"></span>
                </div>
                <input id="useremail-checkbox" class="popup__checkbox" type="checkbox">
              </div>
            </div>
        
            <div class="popup__avatar-container">
              <img 
                src="${this.avatar}" 
                alt="Avatar"
                class="popup__avatar"
              />
              <div class="popup__avatar-cover">
                <input class="popup__button-edit-avatar" type="file"></input>
              </div>
            </div>

          </div>
          <div class="popup__buttons">
            <button class="popup__button popup__button_add popup__button_add-block" type="submit">Add user</button> 
            <button class="popup__button popup__button_cancel" type="button">cancel</button>
          </div>
        </form>
      </section>`;
  }

  static getPopupWin(time: string) {
    return `<section class="popup">
      <div class="popup-win">
        <p class="text-win">Congratulations! You successfully found all matches on ${time} minutes.</p>
        <a href="#" class="popup__link">
          <p class="link-text">ok</p>
        </a>
      </div>
    </section>`;
  }
}
