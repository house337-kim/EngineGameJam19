import { GameScene } from '../../abstract-game-scene';
import { GameObject } from '../../game-object';

export abstract class Npc extends GameObject {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
    this.size = 'small';
  }
}
