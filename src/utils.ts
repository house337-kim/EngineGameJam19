// Save utils here
import { gameState } from './state/game-state';
import { context } from './constants';

export function getGameState() {
  return gameState;
}

/**
 * Adds a background and fits it to the screen using depth 0
 * @param scene the scene to add the background on
 * @param background the asset
 */
export function addBackgroundImage(scene: Phaser.Scene, background: string) {
  let image = scene.add
    .image(0, 0, background)
    .setOrigin(0)
    .setDepth(0);
  let scaleX = scene.cameras.main.width / image.width;
  let scaleY = scene.cameras.main.height / image.height;
  let scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);
}
