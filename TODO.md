# TODO

### Remove items from scene when picked up

Completely destroy it

```ts
this.key.destroy();

this.hero.addItem('key', this.key);
```

`addItem` should force a re-render of the inventory (via `inventory.draw()`)

```ts
class HeroCharacter {
  public inventory: Inventory = new Inventory();

  addItem(key, sprite) {
    this.inventory.add(key, sprite);
  }

  useItem(key) {
    this.inventory.use(key);
  }

  dropItem(key) {
    this.inventory.drop(key);
  }
}
```

Inventory class

```ts
class Inventory {
    get itemNames() {
        return Object.keys(this.items)
    }

    add(key, sprite) {
        this.items[key] = sprite
    }

    drop(key) {
        const sprite = this.items[key]
        this.drawNear(this.scene.hero, sprite)
        delete this.items[key]

        this.scene.addItem(key, sprite)
    }

    drawNear(target, sprite) {
        // calculate coords near target sprite within bounds
        // move sprite there (set x, y)
    }

    draw() {
        this.itemNames.map((name, index => {
            this.drawInventoryItem(this.items[name], index)
        })
    }

    drawInventoryItem(sprite, index) {
        // TODO
    }
```

### Add physics and collision detection:

```ts
// enable body for all sprites (physical objects have "bodies")
this.hero.enableBody(true);
this.frog.enableBody(true);

// add collision detection between two "body" sprites
this.physics.add.collider(this.hero, this.frog);
```

When hero walks into an npc or item, make the target object act, such as:

- running animation
- speech bubble
- sound
- etc.
