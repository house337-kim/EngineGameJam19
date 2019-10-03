import { SkeletonNpc } from './skeleton';
import { BatNpc } from './bat/index';
import { GhostNpc } from './ghost/index';
import { FrogNpc } from './frog/index';

export const npcMap = {
  frog: FrogNpc,
  bat: BatNpc,
  ghost: GhostNpc,
  skeleton: SkeletonNpc
};

export { SkeletonNpc, BatNpc, GhostNpc, FrogNpc };
