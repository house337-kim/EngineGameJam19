import { objects } from '../../../../constants/objects';
import { GameScene } from '../../abstract-game-scene';
import { CharacterSprite } from '../../../../objects/CharacterSprite';
import { Hero, Animations } from '../../../../main';
import { WORLD_CENTER_X, PLAYER_MOVEMENT_AREA } from '../../../../constants/positions';

export class HeroCharacter {
  protected scene: GameScene;
  protected anims: Animations;

  constructor(scene: GameScene) {
    this.scene = scene;
    this.anims = scene.anims;
  }

  set hero(hero: Hero) {
    this.scene.hero = hero;
  }

  public add() {
    this.addHero();
    this.addAnimations();
  }

  public addHero() {
    this.hero = new CharacterSprite(this.scene, WORLD_CENTER_X, PLAYER_MOVEMENT_AREA * 1.1, 'hero', 4);
  }

  public addAnimations() {
    this.heroWalkRightAnimation();
    this.heroWalkLeftAnimation();
    this.heroIdleAnimation();
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
}
