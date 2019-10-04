import { GameScene } from '../../../abstract-game-scene';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X, WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';
import { Item } from '../item';

export class KeyItem extends Item {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public loadImage() {
    this.scene.load.image('key', '/assets/inventory/key.png');
  }

  public addSprite() {
    const { scene } = this;
    const sprite = scene.add.sprite(WORLD_CENTER_X - 80, WORLD_CENTER_Y + 80, 'key');

    sprite.setInteractive();
    sprite.setScale(0.8);
    scene.sprites[this.name] = sprite;
    this.sprite = sprite;
    this.setActions();
  }

  protected setActions() {
    const { sprite, scene } = this;
    sprite.on('pointerup', () => {
      // Say something
      createSpeechBubble(scene, sprite.x, sprite.y - 120, 250, 100, 'Pick me up!');
    });
  }
}
