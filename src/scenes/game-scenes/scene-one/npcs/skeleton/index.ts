import { GameScene } from '../../../abstract-game-scene';
import { Animations } from '../../../../../main';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X, PLAYER_MOVEMENT_AREA, WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';

function setSkeletonActions(scene: GameScene, skeleton: any) {
  skeleton.on('pointerup', () => {
    // Say something
    createSpeechBubble(scene, skeleton.x, skeleton.y - 120, 250, 100, 'Screach!!');
    skeleton.play('skeleton_fly', true);
  });
}

export class SkeletonNpc {
  protected scene: any;
  protected anims: Animations;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.anims = scene.anims;
  }

  set skeleton(skeleton: any) {
    this.scene.skeleton = skeleton;
  }

  get skeleton(): any {
    return this.scene.skeleton;
  }

  public add() {
    this.addSkeleton();
    this.addAnimations();
  }

  public addAnimations() {
    this.skeletonWalkAnimation();
  }

  public addSkeleton() {
    this.skeleton = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X - 260,
      WORLD_CENTER_Y + 100,
      objects.sprites.small.skeleton,
      0
    );
    this.skeleton.setInteractive();
    setSkeletonActions(this.scene, this.skeleton);
  }

  protected skeletonWalkAnimation() {
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
