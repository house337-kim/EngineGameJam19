import { objects } from '../../constants/objects';
import { Player, Hero, Input } from '../../main';
import { SceneUpdater } from './scene-one/update';
import { BaseSceneUpdater } from './base-scene-updater';

export interface GameScene {
  player: Player;
  hero: Hero;
  input: Input;
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

  constructor(opts = {}) {
    super(opts);
  }
}
