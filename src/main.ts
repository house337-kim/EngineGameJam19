import 'phaser';
import { WORLD_HEIGHT, WORLD_WIDTH } from './constants/positions';
import { LoadingScene } from './scenes/load-scene';
import { MenuScene } from './scenes/menu-scene';
import { SceneOne } from './scenes/game-scenes/scene-one';
import GameConfig = Phaser.Types.Core.GameConfig;
import Game = Phaser.Game;

export type Player = Phaser.GameObjects.Container;
export type Hero = Phaser.Physics.Arcade.Sprite;
export type Input = Phaser.Input.InputPlugin;
export type Pointer = Phaser.Input.Pointer;
export type Animations = Phaser.Animations.AnimationManager;

const config: GameConfig = {
  width: WORLD_WIDTH,
  height: WORLD_HEIGHT,
  type: Phaser.AUTO,
  backgroundColor: '#000',
  scene: [LoadingScene, MenuScene, SceneOne],
  render: {
    pixelArt: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true
    }
  }
};

new Game(config);
