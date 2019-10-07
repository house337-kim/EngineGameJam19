import { GameScene } from '../../../abstract-game-scene';
import { Item } from '../item';

export class KeyItem extends Item {
  // protected coords = { x: -80, y: 80 };
  // protected scale = 0.8;
  // protected message = 'Pick me up!';
  // protected assetPath = 'inventory/key.png';

  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }
}
