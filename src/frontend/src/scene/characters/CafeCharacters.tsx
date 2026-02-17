import CafeDogs from './CafeDogs';

/**
 * Aggregator component that composes cafe characters (dogs only, humans removed).
 * Provides a single mount point for the basic room scene to reduce wiring complexity.
 */
export default function CafeCharacters() {
  return (
    <group>
      <CafeDogs />
    </group>
  );
}
