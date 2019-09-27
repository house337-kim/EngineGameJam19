import {context} from '../constants/constants';
import { CharacterSprite } from '../objects/CharacterSprite';
import { addBackgroundImage } from '../utils/utils';
import { hasClickedInMovementArea } from '../utils/movement-utils';
import {PLAYER_MOVEMENT_AREA, WORLD_CENTER_X, WORLD_HEIGHT} from '../constants/positions';
import { LoadingScene } from './load-scene';

export class SceneOne extends Phaser.Scene {
  public player!: Phaser.GameObjects.Container;
  public hero!: Phaser.Physics.Arcade.Sprite;
  public checkpoint?: {
    x: number;
    y: number;
  };

  constructor() {
    super({
      key: context.scenes.scene_one
    });
  }

  public addAnimations() {
    // walk right animation for when character is walking left
    this.anims.create({
      key: 'walk_left',
      frameRate: 10,
      repeat: -1, // repeat forever
      frames: this.anims.generateFrameNumbers(context.sprites.hero, {
        start: 0,
        end: 3
      })
    });

    // walk right animation for when character is walking right
    this.anims.create({
      key: 'walk_right',
      frameRate: 10,
      repeat: -1, // repeat forever
      frames: this.anims.generateFrameNumbers(context.sprites.hero, {
        start: 5,
        end: 8
      })
    });

    // Idle animation for when character is standing waiting
    this.anims.create({
      key: 'idle',
      frameRate: 10,
      repeat: -1, // repeat forever
      frames: this.anims.generateFrameNumbers(context.sprites.hero, {
        start: 4,
        end: 4
      })
    });
  }

  public preload() {
    // Add background,center and fit
    addBackgroundImage(this, context.images.scene_one_bg);

    // Add movement area line
    const loadingBox = this.add.graphics({
      fillStyle: {
        color: 0x222222,
        alpha: 0.8
      }
    });

    // loadingBox.fillRect(0, PLAYER_MOVEMENT_AREA, this.game.renderer.width, 1);

    loadingBox.lineStyle(2, 0x000000, 1);

    loadingBox.lineBetween(300, PLAYER_MOVEMENT_AREA, this.game.renderer.width - 300, PLAYER_MOVEMENT_AREA);

    loadingBox.lineBetween(100, 0, 100, this.game.renderer.height);
    loadingBox.lineBetween(300, 0, 300, PLAYER_MOVEMENT_AREA);

    loadingBox.lineBetween(this.game.renderer.width - 100, 0, this.game.renderer.width - 100, this.game.renderer.height);
    loadingBox.lineBetween(this.game.renderer.width - 300, 0, this.game.renderer.width - 300, PLAYER_MOVEMENT_AREA);

    loadingBox.lineBetween(100, this.game.renderer.height, 300, PLAYER_MOVEMENT_AREA);
    loadingBox.lineBetween(this.game.renderer.width - 100, this.game.renderer.height, this.game.renderer.width - 300, PLAYER_MOVEMENT_AREA);

    this.addAnimations();
  }

  public init(data) {
    console.log('Received from previous scene:', data);
  }

  public update(time: number, delta: number) {
    if (this.hero.body.velocity.x > 0) {
      // moving right
      this.hero.play('walk_right', true);
      if (this.checkpoint && this.hero.x > this.checkpoint.x) {
        this.hero.setVelocityX(0);
      }
    } else if (this.hero.body.velocity.x < 0) {
      // moving left
      this.hero.play('walk_left', true);
      if (this.checkpoint && this.hero.x < this.checkpoint.x) {
        this.hero.setVelocityX(0);
      }
    }

    let perceptionFactor = 0.008;

    if (this.hero.body.velocity.y > 0) {
      // moving down
      this.hero.setScale(this.hero.scaleX + perceptionFactor, this.hero.scaleY + perceptionFactor);
      if (this.checkpoint && this.hero.y > this.checkpoint.y) {
        this.hero.setVelocityY(0);
      }
    } else if (this.hero.body.velocity.y < 0) {
      // moving up
      this.hero.setScale(this.hero.scaleX - perceptionFactor, this.hero.scaleY - perceptionFactor);
      if (this.checkpoint && this.hero.y < this.checkpoint.y) {
        this.hero.setVelocityY(0);
      }
    }

    // check if hero reached a bounding box of checkpoint.xy +- 2 and only then play idle anims. 
    if(this.checkpoint) {
      if(this.hero.x >= this.checkpoint.x - 2 && this.hero.x <= this.checkpoint.x + 2) {
        if(this.hero.y >= this.checkpoint.y - 2 && this.hero.y <= this.checkpoint.y + 2) {
          this.hero.play('idle', true);
        }
      }
    }

    if (this.checkpoint && this.hero.y == this.checkpoint.y && this.hero.x == this.checkpoint.x) {
      this.hero.play('idle', true);
    }

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {

      if (hasClickedInMovementArea(pointer.worldY)) {
        this.checkpoint = {x: pointer.worldX, y: pointer.worldY};
        if (this.hero.active === true) {
          if (pointer.worldX > this.hero.x) {
            // Move Right
            this.hero.setActive(false);
            this.hero.setVelocityX(128);
            // check if hero has arrived to checkpoint
            this.hero.setActive(true);
          } else {
            // move left
            this.hero.setActive(false);
            this.hero.setVelocityX(-128);
            // check if hero has arrived to checkpoint
            this.hero.setActive(true);
          }

          if (pointer.worldY > this.hero.y) {
            // Move down
            this.hero.setActive(false);
            this.hero.setVelocityY(128);
            // check if hero has arrived to checkpoint
            this.hero.setActive(true);
          } else {
            // move up
            this.hero.setActive(false);
            this.hero.setVelocityY(-128);
            // check if hero has arrived to checkpoint
            this.hero.setActive(true);
          }
        }
      }
    });
  }

  public create() {
    console.log('Scene One - Scene');

    this.hero = new CharacterSprite(this, WORLD_CENTER_X , PLAYER_MOVEMENT_AREA * 1.10, "hero", 4);
  }
}
