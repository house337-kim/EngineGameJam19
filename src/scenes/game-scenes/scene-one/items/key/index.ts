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

  public add() {
    this.addSprite();
    this.addAnimations();
  }

  public addSprite() {
    this.sprite = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X + 180,
      WORLD_CENTER_Y + 340,
      objects.sprites.inventory.key,
      0
    );
    this.sprite.setInteractive();
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
