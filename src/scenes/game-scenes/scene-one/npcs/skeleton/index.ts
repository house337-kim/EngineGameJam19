import { GameScene } from '../../../abstract-game-scene';
import { Npc } from '../npc';

export class SkeletonNpc extends Npc {
  protected coords = { x: -260, y: 100 };
  protected message = 'Screach!!';

  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.walkAnimation();
  }

  protected walkAnimation() {
    this.addAnimation('walk', {
      start: 0,
      end: 2,
      repeat: 3
    });
  }
}
