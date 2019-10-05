import { GameScene } from '../../../abstract-game-scene';
import { Npc } from '../npc';

export class FrogNpc extends Npc {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }
}
