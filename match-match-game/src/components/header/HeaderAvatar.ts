export default class HeaderAvatar {
  avatar: string;

  selectorAvatarContainer = 'header__avatar-container';

  selectorImage = 'header__avatar';

  containerImage: HTMLElement;

  image: HTMLImageElement;

  constructor(avatar: string) {
    this.avatar = avatar;
  }

  getAvatar() {
    this.containerImage = document.createElement('div');
    this.containerImage.className = this.selectorAvatarContainer;
    this.image = document.createElement('img');
    this.image.className = this.selectorImage;
    this.image.src = this.avatar;
    this.image.alt = 'Avatar';
    this.containerImage.append(this.image);
    return this.containerImage;
  }
}
