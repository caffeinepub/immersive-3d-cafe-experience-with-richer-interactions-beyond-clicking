import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Vector3, Camera } from 'three';
import { Html } from '@react-three/drei';
import type { PanelType } from '../../state/uiOverlayStore';

interface Zone {
  id: string;
  position: [number, number, number];
  radius: number;
  label: string;
  action: string;
}

const zones: Zone[] = [
  {
    id: 'counter-zone',
    position: [0, 0, -4],
    radius: 2.5,
    label: 'Counter Area - View Menu',
    action: 'menu',
  },
  {
    id: 'seating-zone',
    position: [-3, 0, 2],
    radius: 2,
    label: 'Seating Area - Learn About Us',
    action: 'about',
  },
];

interface ProximityZonesProps {
  camera: Camera;
  onActivate: (panel: PanelType) => void;
}

export default function ProximityZones({ camera, onActivate }: ProximityZonesProps) {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const previousZone = useRef<string | null>(null);

  useFrame(() => {
    const cameraPos = new Vector3();
    camera.getWorldPosition(cameraPos);

    let currentZone: string | null = null;

    for (const zone of zones) {
      const zonePos = new Vector3(...zone.position);
      const distance = cameraPos.distanceTo(zonePos);

      if (distance < zone.radius) {
        currentZone = zone.id;
        break;
      }
    }

    if (currentZone !== previousZone.current) {
      setActiveZone(currentZone);
      previousZone.current = currentZone;
    }
  });

  const activeZoneData = zones.find((z) => z.id === activeZone);

  return (
    <>
      {activeZoneData && (
        <Html fullscreen>
          <div className="pointer-events-none fixed bottom-24 left-1/2 -translate-x-1/2">
            <div className="rounded-lg bg-background/95 px-6 py-3 shadow-xl backdrop-blur-sm">
              <p className="text-sm font-medium text-muted-foreground">
                {activeZoneData.label}
              </p>
              <button
                className="pointer-events-auto mt-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                onClick={() => onActivate(activeZoneData.action as PanelType)}
              >
                Open
              </button>
            </div>
          </div>
        </Html>
      )}
    </>
  );
}
