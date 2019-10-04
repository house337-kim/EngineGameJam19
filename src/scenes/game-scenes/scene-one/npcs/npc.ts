import { Animations } from '../../../../main';
import { GameScene } from '../../abstract-game-scene';

export abstract class Npc {
  protected scene: any;
  protected anims: Animations;
  protected name: string;

  constructor(scene: GameScene, name: string) {
    this.scene = scene;
    this.anims = scene.anims;
    this.name = name;
  }

  set sprite(sprite: any) {
    this.scene.npcs[this.name] = sprite;
  }

  get sprite(): any {
    return this.scene.npcs[this.name];
  }

  public add() {
    this.addSprite();
    this.addAnimations();
  }

  protected abstract addSprite();
  protected abstract addAnimations();
}
