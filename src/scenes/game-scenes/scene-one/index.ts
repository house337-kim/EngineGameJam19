import { objects } from '../../../constants/objects';
import { addBackgroundImage } from '../../../helpers/utils';
import { PLAYER_MOVEMENT_AREA } from '../../../constants/positions';
import { AbstractGameScene, CheckPoint } from '../abstract-game-scene';
import { SceneOneUpdater } from './update';
import { HeroCharacter } from './hero';
import { CharacterSprite } from '../../../objects/CharacterSprite';
import { FrogNpc } from './frog';

export type Frog = CharacterSprite;

export class SceneOne extends AbstractGameScene {
  public checkpoint?: CheckPoint;
  protected frog: Frog;
  protected _heroCharacter: HeroCharacter;
  protected _frogNpc: FrogNpc;

  constructor() {
    super({
      key: objects.scenes.scene_one
    });
  }

  public addAnimations() {
    this.addHeroAnimations();
    this.addNpcAnimations();
  }

  public addHeroAnimations() {
    this.heroCharacter.addAnimations();
  }

  // TODO: maintain hash map (object) of all NPCs in each scene
  // same for objects
  public addNpcAnimations() {
    this.addFrogAnimations();
  }

  public addFrogAnimations() {
    this.frogNpc.addAnimations();
  }

  public preload() {
    // Add background,center and fit
    addBackgroundImage(this, objects.images.scene_one_bg);
    // addFloor(this, objects.images.floor);
    this.drawSceneBorderLines();

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

  get frogNpc(): FrogNpc {
    this._frogNpc = this._frogNpc || new FrogNpc(this);
    return this._frogNpc;
  }

  protected addCharacters() {
    this.addHero();
    this.addFrog();
  }

  protected addHero() {
    this.heroCharacter.addHero();
  }

  protected addFrog() {
    this.frogNpc.addFrog();
  }
}
