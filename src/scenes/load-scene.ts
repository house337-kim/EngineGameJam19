import {context} from '../constants/constants';
import {WORLD_CENTER_X, WORLD_CENTER_Y} from '../constants/positions';

export class LoadingScene extends Phaser.Scene {
  constructor() {
    super({
      key: context.scenes.loading
    });
  }

  /**
   * Loads all buttons under the path using the constants file
   */
  public loadButtons() {
    this.load.setPath('/assets/buttons');
    // tslint:disable-next-line:forin
    for (const prop in context.buttons) {
      this.load.image(context.buttons[prop], context.buttons[prop]);
    }
  }

  /**
   * Loads all images under the path using the constants file
   */
  public loadImages() {
    this.load.setPath('/assets/images');
    // tslint:disable-next-line:forin
    for (const prop in context.images) {
      this.load.image(context.images[prop], context.images[prop]);
    }
  }

  /**
   * Loads all sprites under the path using the constants file
   */
  public loadSprites(frameConfig: any) {
    this.load.setPath('./assets/sprites');

    // tslint:disable-next-line:forin
    for (const prop in context.sprites) {
      this.load.spritesheet(context.sprites[prop], context.sprites[prop], frameConfig);
    }
  }

  public preload() {
    this.loadButtons();
    this.loadImages();
    this.loadSprites({
      frameWidth: 32,
      frameHeight: 48
    });
    // Create loading bar
    const loadingBar = this.add.graphics({
      fillStyle: {
        color: 0xffffff, // white
        alpha: 1
      }
    });

    const loadingBox = this.add.graphics({
      fillStyle: {
        color: 0x222222,
        alpha: 0.8
      }
    });

    loadingBox.fillRect(WORLD_CENTER_X - 20, WORLD_CENTER_Y - 20, 340, 70);

    // Loader events:
    // progress - loader progress in decimal
    // complete - when finished loading the assets
    this.load.on('progress', percent => {
      loadingBar.clear();
      loadingBar.fillStyle(0xffffff, 1);
      loadingBar.fillRect(WORLD_CENTER_X, WORLD_CENTER_Y, 300 * percent, 30);
    });

    this.load.on('complete', () => {
      this.scene.start(context.scenes.menu);
    });
  }

  public create() {
    console.log('This is the Loader Scene');
  }
}
