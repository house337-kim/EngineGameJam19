// Save utils here
import { gameState } from '../state/game-state';
import {PLAYER_MOVEMENT_AREA} from '../constants/positions';

export function getGameState() {
  return gameState;
}

/**
 * Adds a background and fits it to the screen using depth 0
 * @param scene the scene to add the background on
 * @param background the asset
 */
export function addBackgroundImage(scene: Phaser.Scene, background: string) {
  const image = scene.add
    .image(0, 0, background)
    .setOrigin(0)
    .setDepth(0);
  const scaleX = scene.cameras.main.width / image.width;
  const scaleY = scene.cameras.main.height / image.height;
  const scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);
}

/**
 * Adds a clickable floor background that is used as a play area
 * @param scene the scene to add the floor on
 * @param floor the asset
 */
export function addFloor(scene: Phaser.Scene, floor: string) {
  const image = scene.add
  .image(0, PLAYER_MOVEMENT_AREA, floor)
  .setOrigin(0)
  .setDepth(0);

  const scaleX = scene.cameras.main.width / image.width;
  const scaleY = scene.cameras.main.height / image.height;
  const scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);

  return image;
}
