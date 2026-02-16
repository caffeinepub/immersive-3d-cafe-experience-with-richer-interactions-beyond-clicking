import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Heart, Users, Award } from 'lucide-react';

interface AboutPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function AboutPanel({ open, onClose }: AboutPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-xl flex flex-col p-0 safe-top safe-bottom"
        style={{ maxHeight: 'var(--app-height, 100dvh)' }}
      >
        <SheetHeader className="px-4 py-4 sm:px-6 sm:py-6 border-b shrink-0">
          <SheetTitle className="text-xl sm:text-2xl">About Contour Cafe</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-4 py-4 sm:px-6 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            <div className="prose prose-sm dark:prose-invert">
              <p className="text-muted-foreground text-sm sm:text-base">
                Welcome to Contour Cafe, where topographic artistry meets exceptional coffee.
                Our unique space is designed to inspire exploration and connection, blending
                immersive 3D experiences with the warmth of a traditional coffeehouse.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4">
                <Heart className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Our Passion</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    We're passionate about crafting the perfect cup and creating memorable
                    experiences. Every detail, from bean selection to presentation, is
                    carefully considered.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Our Community</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    More than a cafe, we're a gathering place for creators, thinkers, and
                    coffee lovers. Join us for events, workshops, and conversations.
                  </p>
                </div>
              </div>

              <div className="flex gap-3 sm:gap-4 rounded-lg border p-3 sm:p-4">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Our Quality</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                    We source ethically-grown, specialty-grade beans and work with skilled
                    roasters to ensure every cup meets our high standards.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-3 sm:p-4">
              <h3 className="mb-2 font-semibold text-sm sm:text-base">Visit Us</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                123 Contour Street, Design District
                <br />
                Open Daily: 7am - 8pm
                <br />
                Phone: (555) 123-4567
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
