import { GameScene, CheckPoint } from './abstract-game-scene';
import { Player, Hero, Input, Pointer } from '../../main';
import { hasClickedInMovementArea } from '../../helpers/movement-utils';

export interface SceneUpdater {
  scene: GameScene;
  player: Player;
  hero: Hero;
  update(time: number, delta: number): void;
}

export abstract class BaseSceneUpdater implements SceneUpdater {
  public scene: GameScene;
  public player: Player;
  public hero: Hero;
  public input: Input;
  public checkpoint?: CheckPoint;
  protected perceptionFactor: number;
  protected playerVelocity: number;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.hero = scene.hero;
    this.input = scene.input;
    this.perceptionFactor = 0.008;
    this.playerVelocity = 128;
  }

  public update(time: number, delta: number) {
    this.moveRight();
    this.moveLeft();
    this.moveDown();
    this.moveUp();
    this.checkBoundingBox();
    this.handleInput();
  }

  protected moveRight() {
    if (this.hero.body.velocity.x > 0) {
      // moving right
      this.hero.play('walk_right', true);
      if (this.checkpoint && this.hero.x > this.checkpoint.x) {
        this.hero.setVelocityX(0);
      }
    }
  }

  protected moveLeft() {
    if (this.hero.body.velocity.x < 0) {
      // moving left
      this.hero.play('walk_left', true);
      if (this.checkpoint && this.hero.x < this.checkpoint.x) {
        this.hero.setVelocityX(0);
      }
    }
  }

  protected moveDown() {
    const { perceptionFactor } = this;

    if (this.hero.body.velocity.y > 0) {
      // moving down
      this.hero.setScale(this.hero.scaleX + perceptionFactor, this.hero.scaleY + perceptionFactor);
      if (this.checkpoint && this.hero.y > this.checkpoint.y) {
        this.hero.setVelocityY(0);
      }
    }
  }

  protected moveUp() {
    const { perceptionFactor } = this;

    if (this.hero.body.velocity.y < 0) {
      // moving up
      this.hero.setScale(this.hero.scaleX - perceptionFactor, this.hero.scaleY - perceptionFactor);
      if (this.checkpoint && this.hero.y < this.checkpoint.y) {
        this.hero.setVelocityY(0);
      }
    }
  }

  protected handleInput() {
    this.input.on('pointerup', (pointer: Pointer) => {
      if (hasClickedInMovementArea(pointer.worldY)) {
        this.checkpoint = { x: pointer.worldX, y: pointer.worldY };
        if (this.hero.active === true) {
          this.pointerVerticalMotion(pointer);
          this.pointerHorisontalMotion(pointer);
        }
      }
    });
  }

  protected abstract checkBoundingBox();

  protected makeMotion({ velocityX, velocityY }: any = {}) {
    const { playerVelocity } = this;
    this.hero.setActive(false);
    // Move up/down
    velocityY && this.hero.setVelocityY(velocityY * playerVelocity);
    // Move left/right
    velocityX && this.hero.setVelocityX(velocityX * playerVelocity);
    // check if hero has arrived to checkpoint
    this.hero.setActive(true);
  }

  protected makeXMotion(velocity) {
    this.makeMotion({ velocityX: velocity });
  }

  protected makeYMotion(velocity) {
    this.makeMotion({ velocityY: velocity });
  }

  protected moveDownMotion() {
    this.makeYMotion(1);
  }

  protected moveUpMotion() {
    this.makeYMotion(-1);
  }

  protected moveRightMotion() {
    this.makeXMotion(1);
  }

  protected moveLeftMotion() {
    this.makeXMotion(-1);
  }

  protected pointerVerticalMotion(pointer) {
    pointer.worldY > this.hero.y ? this.moveDownMotion() : this.moveUpMotion();
  }

  protected pointerHorisontalMotion(pointer) {
    pointer.worldX > this.hero.x ? this.moveRightMotion() : this.moveLeftMotion();
  }
}
