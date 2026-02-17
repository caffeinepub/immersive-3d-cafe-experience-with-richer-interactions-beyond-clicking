import HumanCharacter from './HumanCharacter';

/**
 * Placement component for human characters in the cafe.
 * All three humans are now fully static with fixed positions and rotations.
 * Positions: (1) seated customer at table, (2) waiting customer at counter, (3) standing customer in open floor space.
 */
export default function CafeHumans() {
  return (
    <group>
      {/* Seated customer at left table */}
      <HumanCharacter
        position={[-3, 0, 0.3]}
        rotation={Math.PI / 6}
        skinTone="light"
        shirtColor="blue"
        pantsColor="gray"
        seated
      />

      {/* Waiting customer at counter */}
      <HumanCharacter
        position={[-1.5, 0, -3.8]}
        rotation={Math.PI}
        skinTone="tan"
        shirtColor="green"
        pantsColor="brown"
      />

      {/* Standing customer in open floor space (formerly walking) */}
      <HumanCharacter
        position={[5, 0, 2]}
        rotation={Math.PI / 4}
        skinTone="medium"
        shirtColor="red"
        pantsColor="black"
      />
    </group>
  );
}
