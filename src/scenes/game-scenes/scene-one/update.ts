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
    this.moveRight();
    this.moveLeft();
    this.moveDown();
    this.moveUp();
    this.checkBoundingBox();
    this.handleInput();
  }

  protected checkBoundingBox() {
    // check if hero reached a bounding box of checkpoint.xy +- 2 and only then play idle anims.
    if (this.checkpoint) {
      if (this.hero.x >= this.checkpoint.x - 2 && this.hero.x <= this.checkpoint.x + 2) {
        if (this.hero.y >= this.checkpoint.y - 2 && this.hero.y <= this.checkpoint.y + 2) {
          this.hero.play('idle', true);
        }
      }
    }

    if (this.checkpoint && this.hero.y == this.checkpoint.y && this.hero.x == this.checkpoint.x) {
      this.hero.play('idle', true);
    }
  }
}
