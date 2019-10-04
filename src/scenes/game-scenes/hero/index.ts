import { objects } from '../../../constants/objects';
import { GameScene } from '../abstract-game-scene';
import { CharacterSprite } from '../../../objects/CharacterSprite';
import { Hero, Animations } from '../../../main';
import { WORLD_CENTER_X, PLAYER_MOVEMENT_AREA } from '../../../constants/positions';
import { GameObject } from '../game-object';

export class HeroCharacter extends GameObject {
  constructor(scene: GameScene) {
    super(scene, 'hero');
  }

  set hero(hero: Hero) {
    this.scene.hero = hero;
  }

  public addSprite() {
    this.hero = new CharacterSprite(this.scene, WORLD_CENTER_X, PLAYER_MOVEMENT_AREA * 1.1, 'hero', 4);
  }

  public addAnimations() {
    this.heroWalkRightAnimation();
    this.heroWalkLeftAnimation();
    this.heroIdleAnimation();
  }

  protected heroIdleAnimation() {
    // Idle animation for when character is standing waiting
    this.addRepeatAnimation('idle', {
      start: 4,
      end: 4
    });
  }

  protected heroWalkLeftAnimation() {
    this.addRepeatAnimation('left', {
      start: 0,
      end: 3
    });
  }

  protected heroWalkRightAnimation() {
    this.addRepeatAnimation('right', {
      start: 5,
      end: 8
    });
  }
}
