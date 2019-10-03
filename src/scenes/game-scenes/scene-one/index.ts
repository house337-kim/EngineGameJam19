import { objects } from '../../../constants/objects';
import { CharacterSprite } from '../../../objects/CharacterSprite';
import { addBackgroundImage, addFloor } from '../../../helpers/utils';
import { hasClickedInMovementArea } from '../../../helpers/movement-utils';
import { PLAYER_MOVEMENT_AREA, WORLD_CENTER_X } from '../../../constants/positions';
import { createSpeechBubble } from '../../../helpers/text-utils';
import { AbstractGameScene, CheckPoint } from '../abstract-game-scene';
import { SceneOneUpdater } from './update';

function setFrogActions(scene: Phaser.Scene, frog: CharacterSprite) {
  frog.on('pointerup', () => {
    // TODO: find a better way to find x and y position (setOrigin ? )
    // Say something and move
    createSpeechBubble(scene, frog.x, frog.y - 120, 250, 100, 'Leave me alone');
    frog.play('frog_jump', true);
  });
}

export class SceneOne extends AbstractGameScene {
  public checkpoint?: CheckPoint;
  protected frog: CharacterSprite;

  constructor() {
    super({
      key: objects.scenes.scene_one
    });
  }

  public addAnimations() {
    this.addHeroAnimations();
    this.addNpcAnimations();
  }

  public addHeroAnimations() {
    this.heroWalkRightAnimation();
    this.heroWalkLeftAnimation();
    this.heroIdleAnimation();
  }

  public addNpcAnimations() {
    this.frogJumpAnimation();
  }

  public preload() {
    // Add background,center and fit
    addBackgroundImage(this, objects.images.scene_one_bg);
    // addFloor(this, objects.images.floor);

    // Add movement area line
    const loadingBox = this.add.graphics({
      fillStyle: {
        color: 0x222222,
        alpha: 0.8
      }
    });

    // loadingBox.fillRect(0, PLAYER_MOVEMENT_AREA, this.game.renderer.width, 1);

    loadingBox.lineStyle(2, 0x000000, 1);

    loadingBox.lineBetween(300, PLAYER_MOVEMENT_AREA, this.game.renderer.width - 300, PLAYER_MOVEMENT_AREA);

    loadingBox.lineBetween(100, 0, 100, this.game.renderer.height);
    loadingBox.lineBetween(300, 0, 300, PLAYER_MOVEMENT_AREA);

    loadingBox.lineBetween(
      this.game.renderer.width - 100,
      0,
      this.game.renderer.width - 100,
      this.game.renderer.height
    );
    loadingBox.lineBetween(this.game.renderer.width - 300, 0, this.game.renderer.width - 300, PLAYER_MOVEMENT_AREA);

    loadingBox.lineBetween(100, this.game.renderer.height, 300, PLAYER_MOVEMENT_AREA);
    loadingBox.lineBetween(
      this.game.renderer.width - 100,
      this.game.renderer.height,
      this.game.renderer.width - 300,
      PLAYER_MOVEMENT_AREA
    );

    this.addAnimations();
  }

  public init(data) {
    console.log('Received from previous scene:', data);
  }

  public update(time: number, delta: number) {
    this.sceneUpdater.update(time, delta);
  }

  public create() {
    console.log('Scene One - Scene');

    this.addCharacters();
    this.sceneUpdater = new SceneOneUpdater(this);
  }

  protected heroIdleAnimation() {
    // Idle animation for when character is standing waiting
    this.anims.create({
      key: 'idle',
      frameRate: 10,
      repeat: -1, // repeat forever
      frames: this.anims.generateFrameNumbers(objects.sprites.medium.hero, {
        start: 4,
        end: 4
      })
    });
  }

  protected heroWalkLeftAnimation() {
    // walk animation for when character is walking left
    this.anims.create({
      key: 'walk_left',
      frameRate: 10,
      repeat: -1, // repeat forever
      frames: this.anims.generateFrameNumbers(objects.sprites.medium.hero, {
        start: 0,
        end: 3
      })
    });
  }

  protected heroWalkRightAnimation() {
    // walk animation for when character is walking right
    this.anims.create({
      key: 'walk_right',
      frameRate: 10,
      repeat: -1, // repeat forever
      frames: this.anims.generateFrameNumbers(objects.sprites.medium.hero, {
        start: 5,
        end: 8
      })
    });
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

  protected addCharacters() {
    this.addHero();
    this.addFrog();
  }

  protected addHero() {
    this.hero = new CharacterSprite(this, WORLD_CENTER_X, PLAYER_MOVEMENT_AREA * 1.1, 'hero', 4);
  }

  protected addFrog() {
    this.frog = new CharacterSprite(
      this,
      WORLD_CENTER_X + 60,
      PLAYER_MOVEMENT_AREA * 1.15,
      objects.sprites.small.frog,
      0
    );
    this.frog.setInteractive();
    setFrogActions(this, this.frog);
  }
}
