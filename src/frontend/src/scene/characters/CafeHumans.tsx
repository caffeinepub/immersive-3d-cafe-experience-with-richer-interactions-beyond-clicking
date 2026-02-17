import HumanModel from './HumanModel';

/**
 * Placement component for static human characters in the cafe.
 * Positions: (1) seated customer at table, (2) waiting customer at counter, (3) additional standing customer.
 * All humans are now static (no walking or animation) and use bundled GLB models.
 */
export default function CafeHumans() {
  return (
    <group>
      {/* Seated customer at left table */}
      <HumanModel
        position={[-3, 0, 0.3]}
        rotation={Math.PI / 6}
        modelPath="/assets/models/humans/human-01.glb"
        scale={1}
      />

      {/* Waiting customer at counter */}
      <HumanModel
        position={[-1.5, 0, -3.8]}
        rotation={Math.PI}
        modelPath="/assets/models/humans/human-02.glb"
        scale={1}
      />

      {/* Standing customer near right table (replaces walking customer) */}
      <HumanModel
        position={[3.5, 0, 2.5]}
        rotation={Math.PI * 0.75}
        modelPath="/assets/models/humans/human-03.glb"
        scale={1}
      />
    </group>
  );
}
