import { createSpeechBubble } from '../../helpers/text-utils';
import { objects } from '../../constants/objects';
import { Animations } from '../../main';
import { GameScene, StrMap } from './abstract-game-scene';
import { WORLD_CENTER_X, WORLD_CENTER_Y } from '../../constants/positions';
import { CharacterSprite } from '../../objects/CharacterSprite';

const randModf = (max: integer) => Math.round(Math.random() * max - max / 2);

interface Coords {
  x: number;
  y: number;
}

export abstract class GameObject {
  protected coords: Coords = { x: randModf(600), y: randModf(200) };
  protected scene: any;
  protected name: string;
  protected anims: Animations;
  protected size: string;
  protected animations: StrMap = {};
  protected defaultAnimation: string;

  constructor(scene: GameScene, name: string) {
    this.scene = scene;
    this.name = name;
    this.anims = scene.anims;
    this.size = 'medium';
  }

  set sprite(sprite: any) {
    this.scene.npcs[this.name] = sprite;
  }

  get sprite(): any {
    return this.scene.npcs[this.name];
  }

  public add() {
    this.loadImage();
    this.addSprite();
    this.addAnimations();
  }

  public addAnimations() {}
  public loadImage() {}

  protected speechOnClick(message: string) {
    const { sprite, scene } = this;
    sprite.on('pointerup', () => {
      // Say something
      createSpeechBubble(scene, sprite.x, sprite.y - 120, 250, 100, message);
      sprite.play(this.defaultAnimation, true);
    });
  }

  get spriteObj() {
    const { name, size } = this;
    return objects.sprites[size][name];
  }

  protected addSprite() {
    this.sprite = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X - this.coords.x,
      WORLD_CENTER_Y + this.coords.y,
      this.spriteObj,
      0
    );
    this.sprite.setInteractive();
    this.setActions();
  }

  protected setActions() {}

  protected addAnimation(key: string, opts: any = {}) {
    const { name, size } = this;
    const { start, end } = opts;
    const repeat = opts.repeat || -1;
    const frameRate = opts.frameRate || 10;
    const animKey = `${name}_${key}`;
    this.anims.create({
      key: animKey,
      frameRate,
      repeat,
      frames: this.anims.generateFrameNumbers(this.spriteObj, {
        start,
        end
      })
    });
    this.animations[animKey] = true;
    this.defaultAnimation = animKey;
  }
}
