import { GameScene } from '../../../abstract-game-scene';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X, WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';
import { Npc } from '../npc';

export class BatNpc extends Npc {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public add() {
    this.addSprite();
    this.addAnimations();
  }

  public addAnimations() {
    this.flyAnimation();
  }

  public addSprite() {
    this.sprite = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X + 160,
      WORLD_CENTER_Y + 240,
      objects.sprites.small.bat,
      0
    );
    this.sprite.setInteractive();
    this.setActions();
  }

  protected setActions() {
    const { sprite, scene } = this;
    sprite.on('pointerup', () => {
      // Say something
      createSpeechBubble(scene, sprite.x, sprite.y - 120, 250, 100, 'Bat me up!');
      sprite.play('bat_fly', true);
    });
  }

  protected flyAnimation() {
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
