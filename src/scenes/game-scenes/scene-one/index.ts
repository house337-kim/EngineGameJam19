import { objects } from '../../../constants/objects';
import { addBackgroundImage } from '../../../helpers/utils';
import { PLAYER_MOVEMENT_AREA } from '../../../constants/positions';
import { AbstractGameScene, CheckPoint } from '../abstract-game-scene';
import { SceneOneUpdater } from './update';
import { HeroCharacter } from './hero';
import { CharacterSprite } from '../../../objects/CharacterSprite';
import { FrogNpc, BatNpc, SkeletonNpc, GhostNpc } from './npcs';

export type Frog = CharacterSprite;

export class SceneOne extends AbstractGameScene {
  public checkpoint?: CheckPoint;
  protected frog: Frog;
  protected _heroCharacter: HeroCharacter;
  protected _frogNpc: FrogNpc;
  protected _batNpc: BatNpc;
  protected _skeletonNpc: SkeletonNpc;
  protected _ghostNpc: GhostNpc;

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
    this.addBatAnimations();
    this.addSkeletonAnimations();
    this.addGhostAnimations();
  }

  public addFrogAnimations() {
    this.frogNpc.addAnimations();
  }
  public addGhostAnimations() {
    this.ghostNpc.addAnimations();
  }

  public addBatAnimations() {
    this.batNpc.addAnimations();
  }

  public addSkeletonAnimations() {
    this.skeletonNpc.addAnimations();
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

  get batNpc(): BatNpc {
    this._batNpc = this._batNpc || new BatNpc(this);
    return this._batNpc;
  }

  get skeletonNpc(): SkeletonNpc {
    this._skeletonNpc = this._skeletonNpc || new SkeletonNpc(this);
    return this._skeletonNpc;
  }
  get ghostNpc(): GhostNpc {
    this._ghostNpc = this._ghostNpc || new GhostNpc(this);
    return this._ghostNpc;
  }

  protected addCharacters() {
    this.addHero();
    this.addFrog();
    this.addBat();
    this.addSkeleton();
    this.addGhost();
  }

  protected addHero() {
    this.heroCharacter.addHero();
  }

  protected addFrog() {
    this.frogNpc.addFrog();
  }

  protected addBat() {
    this.batNpc.addBat();
  }

  protected addSkeleton() {
    this.skeletonNpc.addSkeleton();
  }
  protected addGhost() {
    this.ghostNpc.addGhost();
  }
}
