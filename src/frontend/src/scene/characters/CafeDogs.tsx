import DogCharacter from './DogCharacter';

/**
 * Placement component for dog characters in the cafe.
 * Positions: (1) dog near seated human at table, (2) dog near counter-waiting human.
 * Scale and Y offsets tuned to avoid sinking below floor.
 */
export default function CafeDogs() {
  return (
    <group>
      {/* Dog near seated customer at left table */}
      <DogCharacter
        position={[-3.5, 0, -0.3]}
        rotation={Math.PI / 3}
        furColor="golden"
        scale={1.2}
      />

      {/* Dog near counter-waiting customer */}
      <DogCharacter
        position={[-2.2, 0, -3.5]}
        rotation={Math.PI * 0.8}
        furColor="brown"
        scale={1}
      />
    </group>
  );
}
