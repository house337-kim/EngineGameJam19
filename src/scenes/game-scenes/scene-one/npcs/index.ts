import { SkeletonNpc } from './skeleton';
import { BatNpc } from './bat';
import { GhostNpc } from './ghost';
import { FrogNpc } from './frog';

export const npcMap = {
  frog: FrogNpc,
  bat: BatNpc,
  ghost: GhostNpc,
  skeleton: SkeletonNpc
};

export { SkeletonNpc, BatNpc, GhostNpc, FrogNpc };
