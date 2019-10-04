import { GameScene, StrMap } from '../abstract-game-scene';
import { InventoryDisplay } from './display';

export class InventoryManager {
  public display: InventoryDisplay;

  constructor(protected scene: GameScene, public items: StrMap = {}) {
    this.display = new InventoryDisplay(scene);
  }

  get itemNames() {
    return Object.keys(this.items);
  }

  public add(key, sprite) {
    this.items[key] = sprite;
  }

  public drop(key) {
    const item = this.items[key];
    this.drawNear(this.scene.hero, item);
    delete this.items[key];

    this.scene.addItem(key, item);
  }

  public draw() {
    this.itemNames.map((name: string, index: number) => {
      this.drawInventoryItem(this.items[name], index);
    });
  }

  protected drawInventoryItem(item, index) {
    // TODO
  }

  protected drawNear(target, item) {
    // calculate coords near target sprite within bounds
    // move sprite there (set x, y)
  }
}
