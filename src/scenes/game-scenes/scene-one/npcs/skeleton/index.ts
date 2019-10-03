import { GameScene } from '../../../abstract-game-scene';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X, WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';
import { Npc } from '../npc';

function setSkeletonActions(scene: GameScene, skeleton: any) {
  skeleton.on('pointerup', () => {
    // Say something
    createSpeechBubble(scene, skeleton.x, skeleton.y - 120, 250, 100, 'Screach!!');
    skeleton.play('skeleton_walk', true);
  });
}

export class SkeletonNpc extends Npc {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.walkAnimation();
  }

  public addSprite() {
    this.sprite = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X - 260,
      WORLD_CENTER_Y + 100,
      objects.sprites.small.skeleton,
      0
    );
    this.sprite.setInteractive();
    setSkeletonActions(this.scene, this.sprite);
  }

  protected walkAnimation() {
    // Jump animation for frog character
    this.anims.create({
      key: 'skeleton_fly',
      frameRate: 10,
      repeat: 3, // repeat forever
      frames: this.anims.generateFrameNumbers(objects.sprites.small.skeleton, {
        start: 0,
        end: 2
      })
    });
  }
}
