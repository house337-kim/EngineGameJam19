import {context} from '../constants/constants';
import {addBackgroundImage} from '../utils/utils';
import {WORLD_CENTER_X, WORLD_CENTER_Y} from '../constants/positions';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: context.scenes.menu
    });
  }

  public preload() {
    // Add using z-index
    // Add logo in the middle and 20% Y axis
    this.add.image(WORLD_CENTER_X, this.game.renderer.height * 0.2, context.images.menu_logo).setDepth(1);

    // Add background,center and fit
    addBackgroundImage(this, context.images.menu_bg);
  }

  public create() {
    console.log('This is the Menu Scene');

    // create the menu scene
    const playButton = this.add
    .image(WORLD_CENTER_X, WORLD_CENTER_Y, context.buttons.play_button)
    .setDepth(0);
    const infoButton = this.add
    .image(WORLD_CENTER_X, WORLD_CENTER_Y + 100, context.buttons.info_button)
    .setDepth(0);
    const exitButton = this.add
    .image(WORLD_CENTER_X, WORLD_CENTER_Y + 200, context.buttons.exit_button)
    .setDepth(0);

    const hoverSelector = this.add.sprite(100, 100, context.buttons.menu_selector);
    hoverSelector.setScale(2);
    hoverSelector.setVisible(false);

    // Make Button image interactive
    playButton.setInteractive();
    infoButton.setInteractive();
    exitButton.setInteractive();

    // Events:
    // pointerover - hovering
    // pointerout - not hovering
    // pointerup - click and release
    // pointerdown - only click

    playButton.on('pointerover', () => {
      hoverSelector.setVisible(true);
      hoverSelector.x = playButton.x - playButton.width;
      hoverSelector.y = playButton.y;
    });

    playButton.on('pointerout', () => {
      hoverSelector.setVisible(false);
    });

    playButton.on('pointerup', () => {
      // Todo: Fetch (from /src/state/game-state.ts) last save status and pass to the next scene (e.g coins, last mission, progress)
      // {coins: 99, mission: { id: 4, progress: 50} }
      // Fire up the scene and pass in our lastSaved state to the scene.
      this.scene.start(context.scenes.scene_one, {
        coins: '90'
      });
    });

    infoButton.on('pointerover', () => {
      hoverSelector.setVisible(true);
      hoverSelector.x = infoButton.x - infoButton.width;
      hoverSelector.y = infoButton.y;
    });

    infoButton.on('pointerout', () => {
      hoverSelector.setVisible(false);
    });

    infoButton.on('pointerup', () => {
      console.log('clicked');
    });

    exitButton.on('pointerover', () => {
      hoverSelector.setVisible(true);
      hoverSelector.x = exitButton.x - exitButton.width;
      hoverSelector.y = exitButton.y;
    });

    exitButton.on('pointerout', () => {
      hoverSelector.setVisible(false);
    });

    exitButton.on('pointerup', () => {
      console.log('clicked');
    });
  }
}
