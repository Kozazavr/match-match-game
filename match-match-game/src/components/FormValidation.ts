export default class FormValidator {
  private inputSelector: string;

  private submitButtonSelector: string;

  private inactiveButtonClass: string;

  private inputErrorClass: string;

  private errorClass: string;

  private popup: HTMLFormElement;

  constructor(
    inputSelector: string,
    submitButtonSelector: string,
    inactiveButtonClass: string,
    inputErrorClass: string,
    errorClass: string,
    popup: HTMLFormElement,
  ) {
    this.inputSelector = inputSelector;
    this.submitButtonSelector = submitButtonSelector;
    this.inactiveButtonClass = inactiveButtonClass;
    this.inputErrorClass = inputErrorClass;
    this.errorClass = errorClass;
    this.popup = popup;
  }

  enableValidation() {
    const form = this.popup;
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this.setEventListeners(form);
  }

  private setEventListeners(form: HTMLFormElement) {
    const inputList = Array.from(form.querySelectorAll(this.inputSelector));
    const buttonElement = form.querySelector(this.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.isValid(form, inputElement as HTMLInputElement);
        this.toggleButtonState(inputList, buttonElement as HTMLButtonElement);
      });
    });
  }

  private toggleButtonState(
    inputList: Element[],
    buttonElement: HTMLButtonElement,
  ) {
    if (FormValidator.hasInvalidInput(inputList)) {
      this.inactiveButton(buttonElement);
    } else {
      this.activeButton(buttonElement);
    }
  }

  private isValid(form: HTMLFormElement, inputElement: HTMLInputElement) {
    if (!inputElement.validity.valid) {
      const messageError = inputElement.validationMessage;
      this.showInputError(form, inputElement, messageError);
    } else {
      this.hideInputError(form, inputElement);
    }
  }

  static hasInvalidInput(inputList: Element[]) {
    return inputList.some(
      (inputElement: HTMLInputElement) => !inputElement.validity.valid,
    );
  }

  private inactiveButton(buttonElement: HTMLButtonElement) {
    buttonElement.classList.add(this.inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'secondAttribute');
  }

  private activeButton(buttonElement: HTMLButtonElement) {
    buttonElement.classList.remove(this.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }

  private showInputError(
    form: HTMLFormElement,
    inputElement: HTMLInputElement,
    messageError: string,
  ) {
    const inputError = form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    inputError.textContent = messageError;
    inputError.classList.add(this.errorClass);
    const checkbox = form.querySelector(`#${inputElement.id}-checkbox`);
    checkbox.removeAttribute('checked');
  }

  private hideInputError(
    form: HTMLFormElement,
    inputElement: HTMLInputElement,
  ) {
    if (inputElement === undefined) {
      const inputList = form.querySelectorAll(this.inputSelector);
      inputList.forEach((item) => {
        this.hideInputError(form, item as HTMLInputElement);
      });
    } else {
      const checkbox = form.querySelector(`#${inputElement.id}-checkbox`);
      checkbox.setAttribute('checked', '');
      const inputError = form.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.remove(this.inputErrorClass);
      inputError.classList.remove(this.errorClass);
      inputError.textContent = ' ';
    }
  }
}
