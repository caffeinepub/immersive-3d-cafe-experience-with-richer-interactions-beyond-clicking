import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import POIMarkers from './POIMarkers';
import ProximityZones from './ProximityZones';
import DoorController from './DoorController';
import InspectableProp from './InspectableProp';
import ScenePanelProps from './ScenePanelProps';
import { useUIOverlayStore } from '../../state/uiOverlayStore';

interface InteractionManagerProps {
  navigationEnabled: boolean;
}

export default function InteractionManager({ navigationEnabled }: InteractionManagerProps) {
  const { camera } = useThree();
  const { setActivePanel } = useUIOverlayStore();

  return (
    <group>
      <POIMarkers camera={camera} onActivate={setActivePanel} />
      <ProximityZones camera={camera} onActivate={setActivePanel} />
      <DoorController camera={camera} />
      <InspectableProp />
      <ScenePanelProps onActivate={setActivePanel} />
    </group>
  );
}
