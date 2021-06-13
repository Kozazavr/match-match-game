import './game.css';
import Selectors from '../../utils/selectors';

export default class GameField {
  size: number;

  theme: string;

  field: HTMLElement;

  image: HTMLImageElement;

  imageCover: HTMLImageElement;

  imageContainer: HTMLElement;

  constructor(size: number, theme: string) {
    this.size = size;
    this.theme = theme;
  }

  setField() {
    this.field = document.createElement('div');
    this.field.classList.add(Selectors.GameField);
    this.addImageSrc();
    this.addImageSrc();
    const arr = GameField.shuffle(
      Array.from(this.field.querySelectorAll(Selectors.CardContainer)),
    );
    for (let i = 0; i < arr.length; i += 1) {
      this.field.append(arr[i]);
    }
    return this.field;
  }

  private getCard() {
    this.imageContainer = document.createElement('div');
    this.imageContainer.classList.add(Selectors.CardContainerAdd);
    this.imageContainer.classList.add(Selectors.Flip);
    this.image = document.createElement('img');
    this.image.classList.add(Selectors.CardImageAdd);

    this.imageCover = document.createElement('img');
    this.imageCover.classList.add(Selectors.CardCover);
    const imageCoverSrc: string = require('../../assets/image__cover.png');
    this.imageCover.src = imageCoverSrc;

    this.imageContainer.append(this.imageCover);
    this.imageContainer.append(this.image);

    return this.imageContainer;
  }

  private addImageSrc() {
    for (let i = 1; i <= this.size; i += 1) {
      const imageContainer = this.getCard();
      const image: HTMLImageElement = imageContainer.querySelector(
        Selectors.CardImage,
      );
      const imageSrc: string = require(`../../assets/${this.theme}/${this.theme}__${i}.jpg`);
      image.src = imageSrc;
      this.field.append(this.imageContainer);
    }
  }

  static shuffle(array: Array<Element>) {
    const arr = array;
    let currentIndex: number = array.length;
    let tmpValue: Element;
    let randomIndex: number;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      tmpValue = array[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = tmpValue;
    }
    return array;
  }
}
