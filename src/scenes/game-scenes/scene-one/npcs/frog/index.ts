import { GameScene } from '../../../abstract-game-scene';
import { Animations } from '../../../../../main';
import { CharacterSprite } from '../../../../../objects/CharacterSprite';
import { WORLD_CENTER_X,  WORLD_CENTER_Y } from '../../../../../constants/positions';
import { objects } from '../../../../../constants/objects';
import { createSpeechBubble } from '../../../../../helpers/text-utils';

function setFrogActions(scene: GameScene, frog: any) {
  frog.on('pointerup', () => {
    // TODO: find a better way to find x and y position (setOrigin ? )
    // Say something and move
    createSpeechBubble(scene, frog.x, frog.y - 120, 250, 100, 'Leave me alone');
    frog.play('frog_jump', true);
  });
}

export class FrogNpc {
  protected scene: any;
  protected anims: Animations;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.anims = scene.anims;
  }

  set frog(frog: any) {
    this.scene.frog = frog;
  }

  get frog(): any {
    return this.scene.frog;
  }

  public add() {
    this.addFrog();
    this.addAnimations();
  }

  public addAnimations() {
    this.frogJumpAnimation();
  }

  public addFrog() {
    this.frog = new CharacterSprite(
      this.scene,
      WORLD_CENTER_X + 10,
      WORLD_CENTER_Y + 200,
      objects.sprites.small.frog,
      0
    );
    this.frog.setInteractive();
    setFrogActions(this.scene, this.frog);
  }

  protected frogJumpAnimation() {
    // Jump animation for frog character
    this.anims.create({
      key: 'frog_jump',
      frameRate: 10,
      repeat: 3, // repeat forever
      frames: this.anims.generateFrameNumbers(objects.sprites.small.frog, {
        start: 0,
        end: 2
      })
    });
  }
}
