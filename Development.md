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

  public addAnimations() {
    this.addHeroAnimations();
    this.addNpcAnimations();
    // this.addItemAnimations();
  }

  // called after create
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

  // called before preload
  public create() {
    console.log('Scene One - Scene');

    this.addCharacters();
    this.addItems();
    this.addItemImages();

    this.sceneUpdater = new SceneOneUpdater(this);
  }

  protected addItemImages() {
    this.addKeyItem();
  }

  protected addCharacters() {
    this.addHero();
    this.addNpcs();
  }

  // ...
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
export class SkeletonNpc extends Npc {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.walkAnimation();
  }

  // TODO: generalise common pattern
  public addSprite() {
    this.sprite = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X - 260,
      WORLD_CENTER_Y + 100,
      objects.sprites.small.skeleton,
      0
    );
    this.sprite.setInteractive();
    this.setActions();
  }

  protected setActions() {
    const { sprite, scene } = this;
    sprite.on('pointerup', () => {
      // Say something
      createSpeechBubble(scene, sprite.x, sprite.y - 120, 250, 100, 'Screach!!');
      sprite.play('skeleton_walk', true);
    });
  }

  protected walkAnimation() {
    this.anims.create({
      key: 'skeleton_walk',
      frameRate: 10,
      repeat: 3,
      frames: this.anims.generateFrameNumbers(objects.sprites.small.skeleton, {
        start: 0,
        end: 2
      })
    });
  }
}
```

### Items

Same as NPCs, but exports a `itemMap`

### Item

```ts
  public loadKey() {
    this.load.image('key', '/assets/inventory/key.png');
  }

  protected addKeyItem() {
    // reference the loaded image called: 'key'
    const key = this.add.sprite(WORLD_CENTER_X - 80, WORLD_CENTER_Y + 80, 'key');

    // make it interactive (ie. can click on it and such)
    key.setInteractive();
    key.setScale(0.8);

    // add to images map
    this.images['key'] = key;

    // show speech bubble when clicked
    key.on('pointerup', () => {
      // Say something
      createSpeechBubble(this, key.x, key.y - 120, 250, 100, 'Use me to unlock the secrets...');
    });
  }
```
