import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3, Camera } from 'three';
import { Html } from '@react-three/drei';
import { poiRegistry } from './poiRegistry';
import type { PanelType } from '../../state/uiOverlayStore';

interface POIMarkersProps {
  camera: Camera;
  onActivate: (panel: PanelType) => void;
}

export default function POIMarkers({ camera, onActivate }: POIMarkersProps) {
  const [hoveredPOI, setHoveredPOI] = useState<string | null>(null);
  const [dwellPOI, setDwellPOI] = useState<string | null>(null);
  const dwellTimers = useRef<Map<string, number>>(new Map());

  useFrame(() => {
    const cameraPos = new Vector3();
    camera.getWorldPosition(cameraPos);
    const cameraDir = new Vector3();
    camera.getWorldDirection(cameraDir);

    poiRegistry.forEach((poi) => {
      const poiPos = new Vector3(...poi.position);
      const toPOI = poiPos.clone().sub(cameraPos).normalize();
      const dot = cameraDir.dot(toPOI);
      const distance = cameraPos.distanceTo(poiPos);

      // Dwell detection (looking at POI for duration)
      if (dot > 0.95 && distance < 5) {
        const currentTime = dwellTimers.current.get(poi.id) || Date.now();
        if (Date.now() - currentTime > 1500) {
          if (dwellPOI !== poi.id) {
            setDwellPOI(poi.id);
            if (poi.action) {
              onActivate(poi.action as PanelType);
            }
          }
        } else if (!dwellTimers.current.has(poi.id)) {
          dwellTimers.current.set(poi.id, Date.now());
        }
      } else {
        dwellTimers.current.delete(poi.id);
        if (dwellPOI === poi.id) {
          setDwellPOI(null);
        }
      }
    });
  });

  return (
    <>
      {poiRegistry.map((poi) => (
        <POIMarker
          key={poi.id}
          poi={poi}
          isHovered={hoveredPOI === poi.id}
          isDwelling={dwellPOI === poi.id}
          onHover={() => setHoveredPOI(poi.id)}
          onUnhover={() => setHoveredPOI(null)}
          onClick={() => onActivate(poi.action as PanelType)}
        />
      ))}
    </>
  );
}

interface POIMarkerProps {
  poi: any;
  isHovered: boolean;
  isDwelling: boolean;
  onHover: () => void;
  onUnhover: () => void;
  onClick: () => void;
}

function POIMarker({ poi, isHovered, isDwelling, onHover, onUnhover, onClick }: POIMarkerProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      const scale = isHovered || isDwelling ? 1.2 : 1;
      meshRef.current.scale.lerp(new Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <group position={poi.position}>
      <mesh
        ref={meshRef}
        onPointerOver={onHover}
        onPointerOut={onUnhover}
        onClick={onClick}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color={isDwelling ? '#ffaa66' : isHovered ? '#ff8844' : '#cc6633'}
          emissive={isDwelling ? '#ff8844' : isHovered ? '#cc5522' : '#aa4422'}
          emissiveIntensity={isDwelling ? 1.5 : isHovered ? 1 : 0.5}
        />
      </mesh>
      {(isHovered || isDwelling) && (
        <Html center distanceFactor={8}>
          <div className="pointer-events-none rounded-lg bg-background/90 px-3 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur-sm">
            {poi.label}
          </div>
        </Html>
      )}
    </group>
  );
}
