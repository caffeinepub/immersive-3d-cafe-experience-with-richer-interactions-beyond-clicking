import { Vector3 } from 'three';
import HumanCharacter from './HumanCharacter';

/**
 * Placement component for human characters in the cafe.
 * Positions: (1) seated customer at table, (2) waiting customer at counter, (3) walking customer on loop path.
 * Placements avoid camera navigation corridor and minimize clipping.
 */
export default function CafeHumans() {
  // Walking path - small loop through open floor space
  const walkPath = [
    new Vector3(5, 0, 2),
    new Vector3(5, 0, 5),
    new Vector3(-5, 0, 5),
    new Vector3(-5, 0, 2),
  ];

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

      {/* Walking customer on loop path */}
      <HumanCharacter
        position={[5, 0, 2]}
        skinTone="medium"
        shirtColor="red"
        pantsColor="black"
        walking
        walkPath={walkPath}
      />
    </group>
  );
}
