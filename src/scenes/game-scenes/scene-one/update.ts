import { AbstractGameScene } from '../abstract-game-scene';
import { Player, Hero } from '../../../main';
import { BaseSceneUpdater } from '../base-scene-updater';

export interface SceneUpdater {
  scene: AbstractGameScene;
  player: Player;
  hero: Hero;
  update(time: number, delta: number): void;
}

export class SceneOneUpdater extends BaseSceneUpdater {
  constructor(scene: AbstractGameScene) {
    super(scene);
  }

  public update(time: number, delta: number) {
    this.checkBoundingBox();
    this.handleInput();
  }

  protected checkBoundingBox() {
    const { checkpoint } = this;
    if (!checkpoint) return;

    if (this.outsideBoundsX && this.outsideBoundsY) {
      this.heroIdle();
    }

    if (this.onCheckpoint) {
      this.heroIdle();
    }
  }

  get onCheckpoint() {
    const { checkpoint, hero } = this;
    return hero.y == checkpoint.y && hero.x == checkpoint.x;
  }

  get outsideBoundsY() {
    const { checkpoint, hero } = this;
    return hero.y >= checkpoint.y - 2 && hero.y <= checkpoint.y + 2;
  }

  get outsideBoundsX() {
    const { checkpoint, hero } = this;
    return hero.x >= checkpoint.x - 2 && hero.x <= checkpoint.x + 2;
  }

  protected heroIdle() {
    this.hero.play('idle', true);
  }
}
