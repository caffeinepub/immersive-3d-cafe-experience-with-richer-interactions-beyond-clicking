import { Keyboard, Mouse, Eye, Move } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface OnboardingOverlayProps {
  open: boolean;
  onClose: () => void;
}

export default function OnboardingOverlay({ open, onClose }: OnboardingOverlayProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Contour Cafe</DialogTitle>
          <DialogDescription>
            Explore our immersive 3D space with intuitive interactions
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3 rounded-lg border p-4">
              <Keyboard className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Movement</h3>
                <p className="text-sm text-muted-foreground">
                  Use WASD or arrow keys to walk around the cafe
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border p-4">
              <Mouse className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Look Around</h3>
                <p className="text-sm text-muted-foreground">
                  Drag on the 3D scene to look around (or double-click for pointer lock)
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border p-4">
              <Eye className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Gaze Interaction</h3>
                <p className="text-sm text-muted-foreground">
                  Look at glowing markers for 1.5s to activate
                </p>
              </div>
            </div>

            <div className="flex gap-3 rounded-lg border p-4">
              <Move className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Proximity Zones</h3>
                <p className="text-sm text-muted-foreground">
                  Walk near objects to reveal contextual actions
                </p>
              </div>
            </div>
          </div>

          <Separator />

          <div className="rounded-lg bg-muted/50 p-4">
            <h3 className="mb-2 font-semibold">Tips</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Hover over glowing spheres to see what they do</li>
              <li>• Walk near the counter to view the menu</li>
              <li>• Drag the small box on the table to inspect it</li>
              <li>• Approach the door to see it open automatically</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onClose} className="w-full sm:w-auto">
            Start Exploring
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
