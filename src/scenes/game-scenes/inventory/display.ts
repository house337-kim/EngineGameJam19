import { GameScene } from '../abstract-game-scene';
import { WORLD_WIDTH } from '../../../constants/positions';

export class InventoryDisplay {
  public items: any[];
  public pending: any[];
  public slots: number;

  protected header: any;
  protected bg: any;
  protected scene: any;
  protected padding: number;
  protected icoSize: number;
  protected cols: number;
  protected width: number;
  protected height: number;
  protected icoGfx: any;

  constructor(scene: GameScene) {
    this.pending = [];
    this.scene = scene;

    this.items = [];
    this.slots = 24;

    this.padding = 5;
    this.icoSize = 16;
    this.cols = 4;

    const { cols, icoSize, padding, slots } = this;

    this.width = icoSize * cols + padding * cols + padding;
    this.height = icoSize * Math.ceil(slots / cols) + padding * Math.ceil(slots / cols) + padding;
  }

  public draw() {
    const { scene, padding, icoSize, width, height, header, bg } = this;

    this.addHeader();
    this.addBackground();

    scene.input.keyboard.onDownCallback = e => {
      if (e.keyCode == 73) {
        // 73 = I
        header.visible = !header.visible;
        bg.visible = !bg.visible;
      }
    };
  }

  get headerTextStyle() {
    return { font: '9px Courier New', fill: '#ffffff' };
  }

  protected addHeader() {
    const { scene, width, padding } = this;
    // header background
    const headerGfx = this.scene.add.graphics({
      fillStyle: {
        color: '#111111',
        alpha: 0.8
      }
    });
    headerGfx.fillRect(0, 0, width, 12);
    const text = scene.add.text(padding, padding - 2, 'Inventory', this.headerTextStyle);
    this.header.addChild(text);

    this.header = scene.add.sprite(20, 20, headerGfx);
    this.header.fixedToCamera = true;
    this.header.inputEnabled = true;
    this.header.input.enableDrag();
  }

  protected addBackground() {
    const { scene, width, height, header } = this;

    // background bpx
    const bgGfx = scene.add.graphics({
      fillStyle: {
        color: '#111111'
      }
    });
    bgGfx.fillRect(0, 0, width, height);

    this.bg = scene.add.sprite(header.x, header.y + 12, bgGfx);

    this.bg.slots = [];
    this.bg.items = [];
  }

  protected setSlotIcon() {
    const { icoSize } = this;
    // empty slot icon
    const icoGfx = this.scene.add.graphics({
      fillStyle: '#666666'
    });

    icoGfx.fillRect(0, 0, icoSize, icoSize);
    this.icoGfx = icoGfx;
  }

  protected addGrid() {
    this.setSlotIcon();

    const { width, height, icoSize, padding } = this;

    let count = 0;

    for (let y = padding; y < height; y += icoSize + padding) {
      for (let x = padding; x < width; x += icoSize + padding) {
        if (count < this.slots) {
          this.addSlotToGrid(x, y);
        }
        count++;
      }
    }
  }

  protected addSlotToGrid(x, y) {
    const { scene, icoGfx } = this;
    const slot = scene.add.sprite(x, y, icoGfx);
    this.bg.addChild(slot);
    this.bg.slots.push(slot);
  }
}
