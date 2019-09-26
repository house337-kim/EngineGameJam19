import { context } from '../constants';
import { CharacterSprite } from '../objects/CharacterSprite';
import { addBackgroundImage } from '../utils';

export class SceneOne extends Phaser.Scene {
  player!: Phaser.GameObjects.Container;
  hero!: Phaser.Physics.Arcade.Sprite;
  checkpoint?: {
    x: number;
    y: number;
  };

  constructor() {
    super({
      key: context.scenes.scene_one
    });
  }

  addAnimations() {
    //walk right animation for when character is walking left
    this.anims.create({
      key: 'walk_left',
      frameRate: 10,
      repeat: -1, //repeat forever
      frames: this.anims.generateFrameNumbers(context.sprites.hero, {
        start: 0,
        end: 3
      })
    });

    //walk right animation for when character is walking right
    this.anims.create({
      key: 'walk_right',
      frameRate: 10,
      repeat: -1, //repeat forever
      frames: this.anims.generateFrameNumbers(context.sprites.hero, {
        start: 5,
        end: 8
      })
    });

    //Idle animation for when character is standing waiting
    this.anims.create({
      key: 'idle',
      frameRate: 10,
      repeat: -1, //repeat forever
      frames: this.anims.generateFrameNumbers(context.sprites.hero, {
        start: 4,
        end: 4
      })
    });
  }

  preload() {
    //Add background,center and fit
    addBackgroundImage(this, context.images.scene_one_bg);

    this.addAnimations();
  }

  init(data) {
    console.log('Received from previous scene:', data);
  }

  update(time: number, delta: number) {
    if (this.hero.body.velocity.x > 0) {
      //moving right
      this.hero.play('walk_right', true);
      if (this.checkpoint && this.hero.x > this.checkpoint.x) {
        this.hero.setVelocityX(0);
        this.hero.play('idle', true);
      }
    } else if (this.hero.body.velocity.x < 0) {
      //moving left
      this.hero.play('walk_left', true);
      if (this.checkpoint && this.hero.x < this.checkpoint.x) {
        this.hero.setVelocityX(0);
        this.hero.play('idle', true);
      }
    }

    this.input.on('pointerup', (pointer: Phaser.Input.Pointer) => {
      this.checkpoint = { x: pointer.worldX, y: pointer.worldY };
      if (this.hero.active === true) {
        if (pointer.worldX > this.hero.x) {
          // Move Right
          this.hero.setActive(false);
          this.hero.setVelocityX(128);
          //check if hero has arrived to checkpoint
          this.hero.setActive(true);
        } else {
          //move left
          this.hero.setActive(false);
          this.hero.setVelocityX(-128);
          //check if hero has arrived to checkpoint
          this.hero.setActive(true);
        }
      }
    });
  }

  create() {
    console.log('Scene One - Scene');

    this.hero = new CharacterSprite(this, 400, 400, context.sprites.hero, 4);
  }

  private walkToPositionFromOriginPosition(
    originPositionX: number,
    originPositionY: number,
    destinationPositionX: number,
    destinationPositionY: number
  ) {}
}
