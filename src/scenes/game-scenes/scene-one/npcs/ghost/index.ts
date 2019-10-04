import { GameScene } from '../../../abstract-game-scene';
import { Animations } from '../../../../../main';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X, PLAYER_MOVEMENT_AREA, WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';
import { Npc } from '../npc';

export class GhostNpc extends Npc {
  constructor(scene: GameScene, name: string) {
    super(scene, name);
  }

  public addAnimations() {
    this.hoverAnimation();
  }

  public addSprite() {
    this.sprite = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X + 60,
      WORLD_CENTER_Y + 100,
      objects.sprites.small.ghost,
      0
    );
    this.sprite.setInteractive();
    this.setActions();
  }

  protected setActions() {
    const { sprite, scene } = this;
    sprite.on('pointerup', () => {
      // TODO: find a better way to find x and y position (setOrigin ? )
      // Say something and move
      createSpeechBubble(scene, sprite.x, sprite.y - 120, 250, 100, 'BOOOO!!!');
      sprite.play('ghost_jump', true);
    });
  }

  protected hoverAnimation() {
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
