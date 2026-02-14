import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Heart, Users, Award } from 'lucide-react';

interface AboutPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutPanel({ open, onClose }: AboutPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-2xl">About Contour Cafe</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div className="prose prose-sm dark:prose-invert">
            <p className="text-muted-foreground">
              Welcome to Contour Cafe, where topographic artistry meets exceptional coffee.
              Our unique space is designed to inspire exploration and connection, blending
              immersive 3D experiences with the warmth of a traditional coffeehouse.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 rounded-lg border p-4">
              <Heart className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Our Passion</h3>
                <p className="text-sm text-muted-foreground">
                  We're passionate about crafting the perfect cup and creating memorable
                  experiences. Every detail, from bean selection to presentation, is
                  carefully considered.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border p-4">
              <Users className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Our Community</h3>
                <p className="text-sm text-muted-foreground">
                  More than a cafe, we're a gathering place for creators, thinkers, and
                  coffee lovers. Join us for events, workshops, and conversations.
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border p-4">
              <Award className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">Our Quality</h3>
                <p className="text-sm text-muted-foreground">
                  We source ethically-grown, specialty-grade beans and work with skilled
                  roasters to ensure every cup meets our high standards.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <h3 className="mb-2 font-semibold">Visit Us</h3>
            <p className="text-sm text-muted-foreground">
              123 Contour Street, Design District
              <br />
              Open Daily: 7am - 8pm
              <br />
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
