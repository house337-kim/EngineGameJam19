import { objects } from '../../../constants/objects';
import { AbstractGameScene } from '../abstract-game-scene';
import { npcMap, npcsEnabled } from './npcs';
import { itemMap, itemsEnabled } from './items';

export class SceneOne extends AbstractGameScene {
  constructor() {
    super({
      key: objects.scenes.scene_one
    });
    this.npcMap = npcMap;
    this.npcsEnabled = npcsEnabled;
    this.itemsEnabled = itemsEnabled;
    this.itemMap = itemMap;
  }
}
