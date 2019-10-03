import { objects } from '../../../constants/objects';
import { addBackgroundImage } from '../../../helpers/utils';
import { PLAYER_MOVEMENT_AREA } from '../../../constants/positions';
import { AbstractGameScene, CheckPoint } from '../abstract-game-scene';
import { SceneOneUpdater } from './update';
import { HeroCharacter } from './hero';
import { npcMap } from './npcs';
import { itemMap } from './items';

export interface StrMap {
  [key: string]: any;
}

export class SceneOne extends AbstractGameScene {
  public checkpoint?: CheckPoint;
  protected _heroCharacter: HeroCharacter;

  protected npcs: StrMap = {};
  protected items: StrMap = {};

  protected npcMap: StrMap;
  protected itemMap: StrMap;

  constructor() {
    super({
      key: objects.scenes.scene_one
    });
    this.npcMap = npcMap;
    this.itemMap = itemMap;
  }

  public addAnimations() {
    this.addHeroAnimations();
    this.addNpcAnimations();
  }

  public addHeroAnimations() {
    this.heroCharacter.addAnimations();
  }

  get npcNames() {
    return Object.keys(this.npcMap);
  }

  get itemNames() {
    return Object.keys(this.itemMap);
  }

  // TODO: maintain hash map (object) of all NPCs in each scene
  // same for objects
  public addNpcAnimations() {
    this.forNpcs('addAnimations');
  }

  public preload() {
    // Add background,center and fit
    addBackgroundImage(this, objects.images.scene_one_bg);

    // this.loadItems()

    // addFloor(this, objects.images.floor);
    this.drawSceneBorderLines();

    this.addAnimations();
  }

  /**
   * Load items
   */
  public loadItems() {
    this.load.setPath('/assets/inventory');
    // See: https://photonstorm.github.io/phaser3-docs/Phaser.Types.Loader.FileTypes.html#.ImageFrameConfig
    this.load.spritesheet('items', 'items.png', {
      frameWidth: 96,
      frameHeight: 96,
      startFrame: 0,
      endFrame: 8,
      spacing: 0
    });
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
    this.sceneUpdater = new SceneOneUpdater(this);
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

  get heroCharacter(): HeroCharacter {
    this._heroCharacter = this._heroCharacter || new HeroCharacter(this);
    return this._heroCharacter;
  }

  protected addCharacters() {
    this.addHero();
    this.addNpcs();
    this.addItems();
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
    return Object.keys(this.npcs).length;
  }

  protected createNpcs() {
    // if (this.npcCount > 0) return;
    this.npcNames.map(key => {
      this.npcs[key] = this.npcs[key] || new this.npcMap[key](this, key);
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
    this.heroCharacter.addHero();
  }
}
