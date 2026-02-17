import DogModel from './DogModel';

/**
 * Placement component for static dog characters in the cafe.
 * Positions: (1) dog near seated human at table, (2) dog near counter-waiting human.
 * All dogs are now static (no idle animation) and use bundled GLB models.
 */
export default function CafeDogs() {
  return (
    <group>
      {/* Dog near seated customer at left table */}
      <DogModel
        position={[-3.5, 0, -0.3]}
        rotation={Math.PI / 3}
        modelPath="/assets/models/dogs/dog-01.glb"
        scale={1.2}
      />

      {/* Dog near counter-waiting customer */}
      <DogModel
        position={[-2.2, 0, -3.5]}
        rotation={Math.PI * 0.8}
        modelPath="/assets/models/dogs/dog-02.glb"
        scale={1}
      />
    </group>
  );
}
