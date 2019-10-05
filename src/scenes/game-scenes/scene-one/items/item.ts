import { GameScene } from '../../abstract-game-scene';
import { GameObject } from '../../game-object';
import { itemMap } from './';

export abstract class Item extends GameObject {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
    this.objMap = itemMap;
    this.hasAnim = false;
    this.setProps();
  }

  protected createSprite() {
    const { scene, name, x, y } = this;
    return scene.add.sprite(x, y, name);
  }
}
