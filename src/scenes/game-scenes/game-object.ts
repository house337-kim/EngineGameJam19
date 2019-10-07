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
  protected coords: Coords = { x: randModf(600), y: randModf(100) };
  protected scene: any;
  protected name: string;
  protected anims: Animations;
  protected size: string;
  protected animations: StrMap = {};
  protected defaultAnimation: string;
  protected scale: number = 1;
  protected assetPath: string;
  protected message: string;
  protected annimationNames = [];
  protected objMap: StrMap = {};
  protected hasAnim: boolean = true;

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

  public addAnimations() {
    this.annimationNames.map(name => this.addAnimation(name));
  }

  public loadImage() {
    const { scene, assetPath, name } = this;
    if (!assetPath) return;
    const fullPath = ['/assets', assetPath].join('/');
    scene.load.image(name, fullPath);
  }

  get props() {
    return this.objMap[this.name];
  }

  protected setProps() {
    const names = Object.keys(this.props);
    names.map(name => {
      const value = this.props[name];
      this[name] = value;
    });
  }

  protected speechOnClick(message: string) {
    const { sprite, scene } = this;
    sprite.on('pointerup', () => {
      createSpeechBubble(scene, sprite.x, sprite.y - 120, 250, 100, message);

      if (!this.hasAnimation) return;
      sprite.play(this.defaultAnimation, true);
    });
  }

  get spriteObj() {
    const { name, size } = this;
    return objects.sprites[size][name];
  }

  protected addSprite() {
    const { name, scene, scale } = this;
    const sprite = this.createSprite();
    this.sprite = sprite;
    scene.sprites[name] = sprite;
    sprite.setInteractive();
    sprite.setScale(scale);
    this.setActions();
  }

  get x() {
    return WORLD_CENTER_X + this.coords.x;
  }

  get y() {
    return WORLD_CENTER_Y + this.coords.y;
  }

  protected createSprite() {
    const { scene, spriteObj, x, y } = this;
    return new CharacterSprite(scene, x, y, spriteObj, 0);
  }

  protected setActions() {
    this.message && this.speechOnClick(this.message);
  }

  protected addRepeatAnimation(key: string, opts: any = {}) {
    this.addAnimation(key, { ...opts, repeat: -1 });
  }

  protected addAnimation(key: string, opts: any = {}) {
    if (!this.hasAnimation) return;
    const { spriteObj } = this;
    let { start, end } = opts;
    start = start || 0;
    end = end || 2;
    const frames = end - start + 1;
    const repeat = opts.repeat || frames;
    const frameRate = opts.frameRate || 10;
    const animKey = key;

    this.anims.create({
      key: animKey,
      frameRate,
      repeat,
      frames: this.anims.generateFrameNumbers(spriteObj, {
        start,
        end
      })
    });
    this.animations[animKey] = true;
    this.defaultAnimation = animKey;
  }

  get hasAnimation() {
    return this.hasAnim;
  }
}
