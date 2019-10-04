import { objects } from '../../constants/objects';
import { Player, Hero, Input, Animations } from '../../main';
import { SceneUpdater } from './scene-one/update';
import { BaseSceneUpdater } from './base-scene-updater';
import { Inventory } from './inventory/index';

export interface GameScene extends Phaser.Scene {
  player: Player;
  hero: Hero;
  input: Input;
  anims: Animations;
}

export interface CheckPoint {
  x: number;
  y: number;
}

export abstract class AbstractGameScene extends Phaser.Scene implements GameScene {
  public player!: Player;
  public hero!: Hero;
  public input: Input;
  public sceneUpdater: BaseSceneUpdater;
  public checkpoint?: CheckPoint;
  public inventory: Inventory;

  constructor(opts = {}) {
    super(opts);
    this.inventory = new Inventory(this);
  }
}
