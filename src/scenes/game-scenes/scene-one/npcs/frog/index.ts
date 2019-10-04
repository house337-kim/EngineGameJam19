import { GameScene } from '../../../abstract-game-scene';
import { Animations } from '../../../../../main';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X, WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';
import { Npc } from '../npc';

export class FrogNpc extends Npc {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.addJumpAnimation();
  }

  public addSprite() {
    this.sprite = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X + 10,
      WORLD_CENTER_Y + 200,
      objects.sprites.small.frog,
      0
    );
    this.sprite.setInteractive();
    this.setActions();
  }

  protected setActions() {
    const { sprite, scene } = this;
    sprite.on('pointerup', () => {
      // TODO: find a better way to find x and y position (setOrigin ? )
      // Say something and move
      createSpeechBubble(scene, sprite.x, sprite.y - 120, 250, 100, 'Leave me alone');
      sprite.play('frog_jump', true);
    });
  }

  protected addJumpAnimation() {
    const { anims } = this;
    // Jump animation for frog character
    anims.create({
      key: 'frog_jump',
      frameRate: 10,
      repeat: 3, // repeat forever
      frames: anims.generateFrameNumbers(objects.sprites.small.frog, {
        start: 0,
        end: 2
      })
    });
  }
}
