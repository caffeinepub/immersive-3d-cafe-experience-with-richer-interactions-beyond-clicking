import { useState } from 'react';
import { AlertCircle, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useRoomLayoutStore } from '../../state/roomLayoutStore';

interface NonWebGLFallbackProps {
  reason: string;
  onRecheck: () => void;
}

/**
 * Non-blocking WebGL capability fallback component with contour texture background.
 * Positioned in the corner with a polished card, improved typography/spacing, collapsible technical details, and a re-check action.
 * Does not block TopNav or panels.
 */
export default function NonWebGLFallback({ reason, onRecheck }: NonWebGLFallbackProps) {
  const [showDetails, setShowDetails] = useState(false);
  const layoutVariant = useRoomLayoutStore((state) => state.variant);

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none">
      {/* Subtle background with contour texture */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'url(/assets/generated/contour-texture-warm.dim_2048x2048.png)',
          backgroundSize: '400px 400px',
          backgroundBlendMode: 'overlay',
        }}
      />
      
      {/* Corner-positioned card - pointer-events-auto only on the card */}
      <div className="absolute bottom-4 right-4 max-w-md pointer-events-auto safe-bottom safe-right">
        <Card className="bg-background/95 backdrop-blur-sm border-coffee/20 shadow-xl">
          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-coffee mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base font-semibold text-coffee">
                  3D View Unavailable
                </CardTitle>
                <CardDescription className="text-sm mt-1">
                  Your browser doesn't support the 3D features needed for the full café experience.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-3 pt-0">
            {/* Basic room representation */}
            <div className="rounded-lg bg-muted/50 p-4 space-y-2">
              <div className="text-sm font-medium text-foreground">
                Café Layout: {layoutVariant === 'standard' ? 'Standard' : 'No Seating'}
              </div>
              <div className="text-xs text-muted-foreground space-y-1">
                <div>• Counter with Menu sign</div>
                <div>• Menu board on back wall</div>
                {layoutVariant === 'standard' && <div>• Tables and chairs</div>}
                <div>• Warm contour-themed décor</div>
              </div>
            </div>

            {/* Collapsible technical details */}
            <Collapsible open={showDetails} onOpenChange={setShowDetails}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-between text-xs h-8 px-2"
                >
                  <span>Technical Details</span>
                  {showDetails ? (
                    <ChevronUp className="h-3 w-3" />
                  ) : (
                    <ChevronDown className="h-3 w-3" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <div className="rounded-md bg-muted/30 p-3 text-xs text-muted-foreground font-mono break-words">
                  {reason}
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Re-check action */}
            <Button
              onClick={onRecheck}
              variant="outline"
              size="sm"
              className="w-full gap-2 h-9 border-coffee/20 hover:bg-coffee/5 hover:border-coffee/30"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="text-sm">Re-check 3D Support</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
