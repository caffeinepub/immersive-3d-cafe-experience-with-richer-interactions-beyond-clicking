import PanelProp from './PanelProp';
import type { PanelType } from '../../state/uiOverlayStore';

interface ScenePanelPropsProps {
  onActivate: (panel: PanelType) => void;
}

export default function ScenePanelProps({ onActivate }: ScenePanelPropsProps) {
  return (
    <group>
      {/* Menu - Coffee cup on counter - adjusted for better visibility */}
      <PanelProp
        position={[-1.5, 1.86, -4.6]}
        label="Menu"
        propType="cup"
        onClick={() => onActivate('menu')}
      />

      {/* About - Card on left table */}
      <PanelProp
        position={[-3, 0.85, 2]}
        label="About"
        propType="card"
        onClick={() => onActivate('about')}
      />

      {/* Contact - Card on right table */}
      <PanelProp
        position={[3, 0.85, 2]}
        label="Contact"
        propType="card"
        onClick={() => onActivate('contact')}
      />
    </group>
  );
}
