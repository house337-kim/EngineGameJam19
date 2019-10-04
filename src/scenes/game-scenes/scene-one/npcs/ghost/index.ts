import { GameScene } from '../../../abstract-game-scene';
import { Npc } from '../npc';

export class GhostNpc extends Npc {
  protected coords = { x: 60, y: 100 };
  protected message = 'BOOOO!!!';

  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.hoverAnimation();
  }

  protected hoverAnimation() {
    this.addAnimation('hover');
  }
}
