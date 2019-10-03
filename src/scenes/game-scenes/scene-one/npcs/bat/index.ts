import { GameScene } from '../../../abstract-game-scene';
import { Animations } from '../../../../../main';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X, PLAYER_MOVEMENT_AREA, WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';

function setBatActions(scene: GameScene, bat: any) {
  bat.on('pointerup', () => {
    // Say something
    createSpeechBubble(scene, bat.x, bat.y - 120, 250, 100, 'Bat me up!');
    bat.play('bat_fly', true);
  });
}

export class BatNpc {
  protected scene: any;
  protected anims: Animations;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.anims = scene.anims;
  }

  set bat(bat: any) {
    this.scene.bat = bat;
  }

  get bat(): any {
    return this.scene.bat;
  }

  public add() {
    this.addBat();
    this.addAnimations();
  }

  public addAnimations() {
    this.batFlyAnimation();
  }

  public addBat() {
    this.bat = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X + 160,
      WORLD_CENTER_Y + 240,
      objects.sprites.small.bat,
      0
    );
    this.bat.setInteractive();
    setBatActions(this.scene, this.bat);
  }

  protected batFlyAnimation() {
    // Jump animation for frog character
    this.anims.create({
      key: 'bat_fly',
      frameRate: 10,
      repeat: 3, // repeat forever
      frames: this.anims.generateFrameNumbers(objects.sprites.small.bat, {
        start: 0,
        end: 2
      })
    });
  }
}
