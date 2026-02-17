import DogModel from './DogModel';

/**
 * Placement component for static dog characters in the cafe with additional dogs near new seating areas.
 * All dogs are static (no idle animation) and use bundled GLB models with primitive fallbacks.
 */
export default function CafeDogs() {
  return (
    <group>
      {/* Dog near left table */}
      <DogModel
        position={[-3.5, 0, -0.3]}
        rotation={Math.PI / 3}
        modelPath="/assets/models/dogs/dog-01.glb"
        scale={1.2}
      />

      {/* Dog near counter */}
      <DogModel
        position={[-2.2, 0, -3.5]}
        rotation={Math.PI * 0.8}
        modelPath="/assets/models/dogs/dog-02.glb"
        scale={1}
      />

      {/* Additional dog near right-front table */}
      <DogModel
        position={[5.5, 0, 2.5]}
        rotation={-Math.PI / 4}
        modelPath="/assets/models/dogs/dog-01.glb"
        scale={1.1}
      />

      {/* Additional dog near back-left table */}
      <DogModel
        position={[-5.2, 0, -2.8]}
        rotation={Math.PI / 2}
        modelPath="/assets/models/dogs/dog-02.glb"
        scale={1.15}
      />
    </group>
  );
}
