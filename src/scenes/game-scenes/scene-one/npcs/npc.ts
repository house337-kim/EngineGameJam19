import { GameScene } from '../../abstract-game-scene';
import { GameObject } from '../../game-object';
import { npcs } from '../../../../story/characters/npcs';

export abstract class Npc extends GameObject {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
    this.size = 'small';
    this.scale = 3;
    this.objMap = npcs;
    this.setProps();
  }
}
