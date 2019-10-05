import { objects } from '../../constants/objects';
import { Player, Hero, Input, Animations } from '../../main';
import { SceneOneUpdater } from './scene-one/update';
import { HeroCharacter } from './hero';
import { BaseSceneUpdater } from './base-scene-updater';
import { InventoryManager } from './inventory/manager';
import { addBackgroundImage } from '../../helpers/utils';
import { PLAYER_MOVEMENT_AREA } from '../../constants/positions';
import { Npc } from './scene-one/npcs/npc';

export interface GameScene extends Phaser.Scene {
  player: Player;
  hero: Hero;
  input: Input;
  anims: Animations;
  addItem(key: string, item: any): void;
}

export interface StrMap {
  [key: string]: any;
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
  public inventory: InventoryManager;

  public checkpoint?: CheckPoint;
  protected _heroCharacter: HeroCharacter;

  protected npcs: StrMap = {};
  protected items: StrMap = {};

  protected npcsEnabled: string[] = [];
  protected npcMap: StrMap = {};
  protected itemMap: StrMap = {};

  protected sprites: StrMap = {};

  constructor(opts = {}) {
    super(opts);
    this.inventory = new InventoryManager(this);
  }

  public preload() {
    // Add background,center and fit
    addBackgroundImage(this, objects.images.scene_one_bg);

    // addFloor(this, objects.images.floor);
    this.drawSceneBorderLines();

    this.loadImages();
    this.addAnimations();
  }

  public init(data) {
    console.log('Received from previous scene:', data);
  }

  public update(time: number, delta: number) {
    this.sceneUpdater.update(time, delta);
  }

  public create() {
    console.log('Scene One - Scene');

    this.addCharacters();
    this.addItems();

    this.sceneUpdater = new SceneOneUpdater(this);
  }

  // when item is dropped by hero on scene
  public addItem(key: string, item: any) {
    // TODO
  }

  protected drawSceneBorderLines() {
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

    loadingBox.lineBetween(
      this.game.renderer.width - 100,
      0,
      this.game.renderer.width - 100,
      this.game.renderer.height
    );
    loadingBox.lineBetween(this.game.renderer.width - 300, 0, this.game.renderer.width - 300, PLAYER_MOVEMENT_AREA);

    loadingBox.lineBetween(100, this.game.renderer.height, 300, PLAYER_MOVEMENT_AREA);
    loadingBox.lineBetween(
      this.game.renderer.width - 100,
      this.game.renderer.height,
      this.game.renderer.width - 300,
      PLAYER_MOVEMENT_AREA
    );
  }

  protected loadImages() {
    this.forItems('loadImage');
  }

  protected addCharacters() {
    this.addHero();
    this.addNpcs();
  }

  protected addAnimations() {
    this.addHeroAnimations();
    this.addNpcAnimations();
    this.addItemAnimations();
  }

  protected addHeroAnimations() {
    this.heroCharacter.addAnimations();
  }

  get npcNames() {
    // Object.keys(this.npcMap);
    return this.npcsEnabled;
  }

  get itemNames() {
    return Object.keys(this.itemMap);
  }

  // TODO: maintain hash map (object) of all NPCs in each scene
  // same for objects
  protected addNpcAnimations() {
    this.forNpcs('addAnimations');
  }

  protected addItemAnimations() {
    this.forItems('addAnimations');
  }

  protected forNpcs(fnName) {
    this.createNpcs();

    this.npcNames.map(key => {
      this.npcs[key][fnName]();
    });
  }

  protected forItems(fnName) {
    this.createItems();

    this.itemNames.map(key => {
      this.items[key][fnName]();
    });
  }

  get npcCount() {
    return Object.keys(this.npcs).length;
  }

  get itemCount() {
    return Object.keys(this.items).length;
  }

  protected createNpcs() {
    // if (this.npcCount > 0) return;
    this.npcNames.map(key => {
      const clazz = this.npcMap[key] || Npc;
      this.npcs[key] = this.npcs[key] || new clazz(this, key);
    });
  }

  protected createItems() {
    // if (this.npcCount > 0) return;
    this.itemNames.map(key => {
      this.items[key] = this.items[key] || new this.itemMap[key](this, key);
    });
  }

  protected addNpcs() {
    this.forNpcs('addSprite');
  }

  protected addItems() {
    this.forItems('addSprite');
  }

  protected addHero() {
    this.heroCharacter.addSprite();
  }

  get heroCharacter(): HeroCharacter {
    this._heroCharacter = this._heroCharacter || new HeroCharacter(this);
    return this._heroCharacter;
  }
}
