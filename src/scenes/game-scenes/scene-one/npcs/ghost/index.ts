import { GameScene } from '../../../abstract-game-scene';
import { Animations } from '../../../../../main';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X, PLAYER_MOVEMENT_AREA, WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';

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

  public add() {
    this.addGhost();
    this.addAnimations();
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
