import { context } from '../constants';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: context.scenes.loading
    });
  }

  /**
   * Loads all buttons under the path using the constants file
   */
  loadButtons() {
    this.load.setPath('/assets/buttons');
    for (let prop in context.buttons) {
      this.load.image(context.buttons[prop], context.buttons[prop]);
    }
  }

  /**
   * Loads all images under the path using the constants file
   */
  loadImages() {
    this.load.setPath('/assets/images');
    for (let prop in context.images) {
      this.load.image(context.images[prop], context.images[prop]);
    }
  }

  /**
   * Loads all sprites under the path using the constants file
   */
  loadSprites(frameConfig: any) {
    this.load.setPath('./assets/sprites');

    for (let prop in context.sprites) {
      this.load.spritesheet(context.sprites[prop], context.sprites[prop], frameConfig);
    }
  }

  init() {}

  preload() {
    this.loadButtons();
    this.loadImages();
    this.loadSprites({
      frameWidth: 32,
      frameHeight: 48
    });
    //Create loading bar
    let loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff, //white
        alpha: 1
      }
    });

    let loadingBox = this.add.graphics({
      fillStyle: {
        color: 0x222222,
        alpha: 0.8
      }
    });

    loadingBox.fillRect(this.game.renderer.height / 2 - 20, this.game.renderer.height / 2 - 20, 340, 70);

    // Loader events:
    // progress - loader progress in decimal
    // complete - when finished loading the assets
    this.load.on('progress', percent => {
      loadingBar.clear();
      loadingBar.fillStyle(0xffffff, 1);
      loadingBar.fillRect(this.game.renderer.height / 2, this.game.renderer.height / 2, 300 * percent, 30);
    });

    this.load.on('complete', () => {
      this.scene.start(context.scenes.menu);
    });
  }

  create() {
    console.log('This is the Loader Scene');
  }
}
