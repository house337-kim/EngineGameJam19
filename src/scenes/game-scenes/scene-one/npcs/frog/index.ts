import { GameScene } from '../../../abstract-game-scene';
import { Npc } from '../npc';

export class FrogNpc extends Npc {
  protected coords = { x: 10, y: 200 };
  protected message = 'Kiss the frog';

  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.jumpAnimation();
  }

  protected jumpAnimation() {
    this.addAnimation('jump');
  }
}
