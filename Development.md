# Development

- `constants` reference asset paths, dimensions etc (to avoid hardcoding)
- `helpers` functions for common use cases such as creating a speech bubble
- `objects` specific types of game objects such as `CharacterSprite`
- `scenes` building and managing game scenes
- `state` game state management such as inventory and mission state

## Scenes

- `menu-scene` Game menu
- `load-scene` Load common assets for scene
- `/game-scenes` - contains all the game scenes

## Game scenes

- `/inventory` Inventory display that can be used in any game scene to display, manage inventory of items carried
- `/scene-one` First game scene
- `abstract-game-scene` abstract class for game scenes that each Game scene should extend
- `base-scene-updater` update functionality common to all scenes, such as moving the main character

### Abstract Game scene

The `AbstractGameScene` should serve as the base class for most scenes in the game. It will include common functionality used across most scenes:

- add hero
- add NPCs
- add Items
- inventory display
- ...

```ts
export abstract class AbstractGameScene extends Phaser.Scene implements GameScene {
  public player!: Player;
  public hero!: Hero;
  public input: Input;
  public sceneUpdater: BaseSceneUpdater;
  public inventory: Inventory;

  public checkpoint?: CheckPoint;
  protected _heroCharacter: HeroCharacter;

  protected npcs: StrMap = {};
  protected items: StrMap = {};

  protected npcMap: StrMap = {};
  protected itemMap: StrMap = {};

  protected sprites: StrMap = {};

  constructor(opts = {}) {
    super(opts);
    this.inventory = new Inventory(this);
  }

  // override as needed

  public addAnimations() {
    this.addHeroAnimations();
    this.addNpcAnimations();
    this.addItemAnimations();
  }

  // called to load assets before create which can reference and add them to the scene
  public preload() {
    // Add background,center and fit
    addBackgroundImage(this, objects.images.scene_one_bg);

    this.loadArtifacts();

    /// ...

    this.addAnimations();
  }

  public update(time: number, delta: number) {
    this.sceneUpdater.update(time, delta);
  }

  // reference loaded assets and add them to the scene
  public create() {
    console.log('Scene One - Scene');

    this.addCharacters();
    this.addItems();

    this.sceneUpdater = new SceneOneUpdater(this);
  }

  protected addCharacters() {
    this.addHero();
    this.addNpcs();
  }

  protected addItems() {
    this.forItems('addSprite');
  }

  // ...
}
```

### Scene one

- `/hero` the `HeroCharacter` class used to adds the hero sprite and animations to the scene
- `/items` the items to be used on this scene
- `/npcs` the NPCs (Non-Player characters) to be used on this scene

A scene uses this pattern:

```ts
import { npcMap } from './npcs';
import { itemMap } from './items';

export class SceneOne extends AbstractGameScene {
  constructor() {
    super({
      key: objects.scenes.scene_one
    });

    this.npcMap = npcMap; // configure NPCs for the scene
    this.itemMap = itemMap; // configure Items for the scene
  }
}
```

Note the above will be a common pattern across most (if not all) game scenes repeated, we can further generalise and encapsulate this pattern to reduce the boilerplate needed for each scene.

### Hero

The `HeroCharacter` class encapsulates everything related to the hero.
For now the main functions are `addSprite` and `addAnimations`, just like the NPC classes.
The `inventory` might well be maaged by this class as well.

```ts
export class HeroCharacter {
  protected scene: GameScene;
  protected anims: Animations;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.anims = scene.anims;
  }

  public addSprite() {
    this.hero = new CharacterSprite(this.scene, WORLD_CENTER_X, PLAYER_MOVEMENT_AREA * 1.1, 'hero', 4);
  }

  public addAnimations() {
    this.heroWalkRightAnimation();
    this.heroWalkLeftAnimation();
    this.heroIdleAnimation();
  }
}
```

### NPC Characters

All NPCs should be exported as a map.

```ts
import { SkeletonNpc } from './skeleton';
import { BatNpc } from './bat';
import { GhostNpc } from './ghost';
import { FrogNpc } from './frog';

export const npcMap = {
  frog: FrogNpc,
  bat: BatNpc,
  ghost: GhostNpc,
  skeleton: SkeletonNpc
};

export { SkeletonNpc, BatNpc, GhostNpc, FrogNpc };
```

### NPC Character

A typical NPC should look like this.
Note that we extend from the base `Npc` class.

Every NPC character must for now have the following public methods:

- `addAnimations`
- `addSprite`

```ts
import { GameScene } from '../../../abstract-game-scene';
import { Npc } from '../npc';

export class SkeletonNpc extends Npc {
  protected coords = { x: -260, y: 100 };

  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.walkAnimation();
  }

  protected setActions() {
    this.speechOnClick('Screach!!');
  }

  protected walkAnimation() {
    this.addAnimation('walk', {
      start: 0,
      end: 2,
      repeat: 3
    });
  }
}
```

### Items

Same as NPCs, but exports a `itemMap`

```ts
import { KeyItem } from './key/';

export const itemMap = {
  key: KeyItem
};

export { KeyItem };
```

### Item

The `Item` class like `Npc` also extends from `GameObject`, which provides a number of helper methods as can be seen for the `Skeleton` class.

```ts
export class KeyItem extends Item {
  protected coords = { x: -80, y: 80 };
  protected scale = 0.8;
  protected message = 'Pick me up!';
  protected assetPath = 'inventory/key.png';

  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }
}
```
