import { GameScene } from '../abstract-game-scene';

export class Inventory {
  public items: any[];
  public pending: any[];
  public slots: number;

  protected header: any;
  protected bg: any;
  protected scene: any;

  constructor(scene: GameScene) {
    this.pending = [];
    this.scene = scene;

    this.items = [];
    this.slots = 24;
  }

  public draw() {
    const { scene, slots, header, bg } = this;
    const padding = 5;
    const icoSize = 16;
    const cols = 4;

    const width = icoSize * cols + padding * cols + padding;
    const height = icoSize * Math.ceil(slots / cols) + padding * Math.ceil(slots / cols) + padding;

    const headerGfx = this.scene.add.graphics({
      fillStyle: {
        color: '#111111',
        alpha: 0.8
      }
    });
    headerGfx.fillRect(0, 0, width, 12);

    this.header = scene.add.sprite(20, 20, headerGfx);
    this.header.fixedToCamera = true;
    this.header.inputEnabled = true;
    this.header.input.enableDrag();

    const bgGfx = scene.add.graphics({
      fillStyle: {
        color: '#111111'
      }
    });
    headerGfx.fillRect(0, 0, width, height);

    this.bg = scene.add.sprite(header.x, header.y + 12, bgGfx);
    this.bg.fixedToCamera = true;

    this.bg.slots = [];
    this.bg.items = [];

    const icoGfx = this.scene.add.graphics({
      fillStyle: '#666666'
    });
    icoGfx.fillRect(0, 0, icoSize, icoSize);

    let count = 0;

    for (let y = padding; y < height; y += icoSize + padding) {
      for (let x = padding; x < width; x += icoSize + padding) {
        if (count < this.slots) {
          const slot = scene.add.sprite(x, y, icoGfx);
          this.bg.addChild(slot);
          this.bg.slots.push(slot);
        }
        count++;
      }
    }

    const text = scene.add.text(padding, padding - 2, 'Inventory', { font: '9px Courier New', fill: '#ffffff' });
    this.header.addChild(text);

    scene.input.keyboard.onDownCallback = e => {
      if (e.keyCode == 73) {
        // 73 = I
        header.visible = !header.visible;
        bg.visible = !bg.visible;
      }
    };
  }
}
