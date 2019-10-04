import { GameScene } from '../../abstract-game-scene';
import { GameObject } from '../../game-object';
import { WORLD_CENTER_X, WORLD_CENTER_Y } from '../../../../constants/positions';

export abstract class Item extends GameObject {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  get hasAnimation() {
    return false;
  }

  protected createSprite() {
    const { scene, name, x, y } = this;
    return scene.add.sprite(x, y, name);
  }
}
