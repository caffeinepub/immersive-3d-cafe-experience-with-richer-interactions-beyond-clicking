import CafeHumans from './CafeHumans';
import CafeDogs from './CafeDogs';

/**
 * Aggregator component that composes all cafe characters (humans + dogs).
 * Provides a single mount point for the basic room scene to reduce wiring complexity.
 */
export default function CafeCharacters() {
  return (
    <group>
      <CafeHumans />
      <CafeDogs />
    </group>
  );
}
