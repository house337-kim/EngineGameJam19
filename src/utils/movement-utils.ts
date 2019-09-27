import {PLAYER_MOVEMENT_AREA} from '../constants/positions';

/**
 * Checks whether the user has clicked inside the movement area
 * @param worldY the Y axis coordinate
 */
export function hasClickedInMovementArea(worldY: number) {
  return worldY > PLAYER_MOVEMENT_AREA;
}
