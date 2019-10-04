import { objects } from '../../../constants/objects';
import { AbstractGameScene } from '../abstract-game-scene';
import { npcMap } from './npcs';
import { itemMap } from './items';

export class SceneOne extends AbstractGameScene {
  constructor() {
    super({
      key: objects.scenes.scene_one
    });
    this.npcMap = npcMap;
    this.itemMap = itemMap;
  }
}
