import { GameScene } from '../../abstract-game-scene';
import { GameObject } from '../../game-object';

export abstract class Item extends GameObject {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }
}
