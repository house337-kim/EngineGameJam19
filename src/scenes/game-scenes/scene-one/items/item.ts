import { Animations } from '../../../../main';
import { GameScene } from '../../abstract-game-scene';

export abstract class Item {
  protected scene: any;
  protected name: string;
  protected anims: Animations;

  constructor(scene: GameScene, name: string) {
    this.scene = scene;
    this.name = name;
    this.anims = scene.anims;
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
  // tslint:disable-next-line: no-empty
  protected addAnimations() {}
}
