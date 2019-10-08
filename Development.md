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
- `update` manages the common game loop functionality for each scene

A scene uses this pattern:

```ts
import { npcMap, npcsEnabled } from './npcs';
import { itemMap } from './items';

export class SceneOne extends AbstractGameScene {
  constructor() {
    super({
      key: objects.scenes.scene_one
    });

    this.npcsEnabled = npcsEnabled; // which npcs are enabled on this scene
    this.npcMap = npcMap; // configured NPCs for the scene (optional class mappings)
    this.itemMap = itemMap; // configure Items for the scene (similar to npcMap, ie. class mappings)
  }
}
```

Note the above will be a common pattern across most (if not all) game scenes repeated, we can further generalise and encapsulate this pattern to reduce the boilerplate needed for each scene.

### Update scene (Game loop)

The `SceneOneUpdater` class is used to define the game loop for scene one. `SceneOneUpdater` extends `BaseSceneUpdater` which defines common game loop functionality for all scenes, such as:

- moving the hero
- checking bounding boxes
- handling user input
- etc.

By having a separate class for managing the game loop, we can substitute or subclass this functionality as needed making it easy to customise it for specific scenes and play around.

Currently, the main function is `update`. In ``BaseSceneUpdater`the`update` has the following base functionality.

```ts
  public update(time: number, delta: number) {
    this.moveHero();
    this.checkBoundingBox();
    this.handleInput();
  }

  protected moveHero() {
    this.moveRight();
    this.moveLeft();
    this.moveDown();
    this.moveUp();
  }
```

Note that we could use a similar map/invoke mechanism to the one we use for NPCs and items to avoid having to define a game loop class for every scene, while leaving the specialization (by class) open when needed.

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

### Characters

Characters should be set up in `story/characters` as follows. Same goes for items.

```ts
export const npcs = {
  bat: {
    scenes: ['one'],
    coords: { x: 160, y: 240 },
    message: 'Bat me up!',
    annimationNames: ['fly']
  },
  frog: {
    scenes: ['one']
    // ...
  }
};
```

### NPC Characters

All NPCs should be exported as a map.

```ts
import { SkeletonNpc } from './skeleton';
import { BatNpc } from './bat';
import { GhostNpc } from './ghost';
import { FrogNpc } from './frog';

// optional mapping to Npc class with extra/custom Npc functionality
export const npcMap = {
  // frog: FrogNpc,
  // bat: BatNpc,
  // ghost: GhostNpc,
  // skeleton: SkeletonNpc
};

export const npcsEnabled = ['frog', 'bat', 'ghost', 'skeleton'];

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

In most cases you can reduce this even further, using the props from `story/characters/npcs` (See [Characters](#Characters) above)

```ts
export class FrogNpc extends Npc {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }
}
```

When reduced to this, you might as well just use `new Npc(scene, name)` from the scene so that no specific class for that Npc is needed. The same pattern can be used for items.

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

### Adding a new item

Simply add a new entry to the `items` object in `story/characters/items`

```ts
export const items = {
  key: {
    coords: { x: -80, y: 80 },
    scale: 0.8,
    message: 'Pick me up!',
    assetPath: 'inventory/key.png'
  }
};
```

### Adding a new NPC

Simply add a new entry to the `npcs` object in `story/characters/npcs`

```ts
export const npcs = {
  bat: {
    scenes: ['one'],
    coords: { x: 160, y: 240 },
    message: 'Bat me up!',
    annimationNames: ['fly']
  }
  // ...
};
```

The internals of each NPC or item object will be modified as we add more features to the game.

Scenes should be a structure defining on what scenes the game object (ie. item or NPC) should be present.
If the object is present on multiple scenes, we might want to have properties for each scene, such as `coords`.

In the future it might look something like this, where scene specific properties can override base properties.

```ts
    scenes: {
      one: {
        coords: { x: 60, y: 240 },
      },
      two: {
        coords: { x: -60, y: 100 },
        messages: ['Not again!' 'Ohoy sailor!'],
      }
    },
    coords: { x: 160, y: 240 },
    message: 'Bat me up!',
    annimationNames: ['fly']
  }
```

To implement specific NPC or Item behavior, add a class such as `KeyItem`

```ts
export class KeyItem extends Item {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }
}
```

Then add the class to a map, such as `itemMap` for items (in `items/index.ts`).
Also add the map key name such `key` to the `itemsEnabled`, which controls which objects are currently enabled in the game or scene.

```ts
export const itemMap = {
  key: KeyItem
};

export const itemsEnabled = ['key'];
```

### Curstomized Game object behavior

The old way [Ghost](https://github.com/paa-kim/EngineGameJam19/blob/5aa94e072b06040b9dd1017ceadf6c1668960f02/src/scenes/game-scenes/scene-one/npcs/ghost/index.ts)

```ts
function setGhostActions(scene: GameScene, ghost: any) {
  ghost.on('pointerup', () => {
    // TODO: find a better way to find x and y position (setOrigin ? )
    // Say something and move
    createSpeechBubble(scene, ghost.x, ghost.y - 120, 250, 100, 'BOOOO!!!');
    ghost.play('ghost_jump', true);
  });
}

export class GhostNpc {
  protected scene: any;
  protected anims: Animations;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.anims = scene.anims;
  }

  set ghost(ghost: any) {
    this.scene.ghost = ghost;
  }

  get ghost(): any {
    return this.scene.ghost;
  }

  public addAnimations() {
    this.ghostJumpAnimation();
  }

  public addGhost() {
    this.ghost = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X + 60,
      WORLD_CENTER_Y + 100,
      objects.sprites.small.ghost,
      0
    );
    this.ghost.setInteractive();
    setGhostActions(this.scene, this.ghost);
  }

  protected ghostJumpAnimation() {
    // Jump animation for ghost character
    this.anims.create({
      key: 'ghost_jump',
      frameRate: 10,
      repeat: 3, // repeat forever
      frames: this.anims.generateFrameNumbers(objects.sprites.small.ghost, {
        start: 0,
        end: 2
      })
    });
  }
}
```

You can achieve the same by implementing/overriding the following methods:

- `loadImage()` - static image
- `addSprite()` - sprite image
- `addAnimations()` - using sprite added
- `setActions()` - such as creating speech bubble on click

We could generalise this to a `load` and `create` phase/methods similar to the phases/methods for scenes.
