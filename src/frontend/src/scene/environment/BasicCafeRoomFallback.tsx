/**
 * Minimal always-available fallback room that renders immediately
 * without any Suspense or Physics dependencies to ensure the user
 * always sees some 3D geometry even if other scene elements fail.
 */
export default function BasicCafeRoomFallback() {
  return (
    <group>
      {/* Floor - simple plane with basic material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#3d3228" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -8]} receiveShadow>
        <boxGeometry args={[30, 5, 0.2]} />
        <meshStandardMaterial color="#2a2420" roughness={0.9} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial color="#2a2420" roughness={0.9} />
      </mesh>

      {/* Right wall */}
      <mesh position={[8, 2.5, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 5, 0.2]} />
        <meshStandardMaterial color="#2a2420" roughness={0.9} />
      </mesh>
    </group>
  );
}
