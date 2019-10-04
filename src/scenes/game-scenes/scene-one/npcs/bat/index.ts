import { GameScene } from '../../../abstract-game-scene';
import { Npc } from '../npc';

export class BatNpc extends Npc {
  protected coords = { x: 160, y: 240 };
  protected message = 'Bat me up!';

  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.flyAnimation();
  }

  protected flyAnimation() {
    this.addAnimation('fly');
  }
}
