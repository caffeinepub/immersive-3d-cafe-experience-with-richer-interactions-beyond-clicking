import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Download, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ExportPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function ExportPanel({ open, onClose }: ExportPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-xl flex flex-col p-0 safe-top safe-bottom"
        style={{ maxHeight: 'var(--app-height, 100dvh)' }}
      >
        <SheetHeader className="px-4 py-4 sm:px-6 sm:py-6 border-b shrink-0">
          <SheetTitle className="text-xl sm:text-2xl">Download for WordPress</SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-4 py-4 sm:px-6 sm:py-6">
          <div className="space-y-4 sm:space-y-6">
            <div className="prose prose-sm dark:prose-invert">
              <p className="text-muted-foreground text-sm sm:text-base">
                Download a static build of this 3D cafe experience to embed in your
                WordPress site using Elementor.
              </p>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-xs sm:text-sm">
                The contact form requires the Internet Computer backend to function.
                Other features will work as a static site.
              </AlertDescription>
            </Alert>

            <Button className="w-full gap-2 min-h-[44px]" size="lg" asChild>
              <a href="/elementor/elementor-static-package.zip" download>
                <Download className="h-5 w-5" />
                Download Package
              </a>
            </Button>

            <div className="space-y-3 sm:space-y-4 rounded-lg border p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base">Installation Instructions</h3>
              <ol className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <li>1. Extract the downloaded ZIP file</li>
                <li>2. Upload the contents to your WordPress hosting</li>
                <li>3. In Elementor, add an HTML widget</li>
                <li>4. Use an iframe to embed: <code className="rounded bg-muted px-1 py-0.5 text-xs break-all">&lt;iframe src="/path-to-cafe/index.html"&gt;</code></li>
                <li>5. Adjust iframe dimensions as needed (recommended: 100% width, 600px+ height)</li>
              </ol>
            </div>

            <div className="space-y-3 sm:space-y-4 rounded-lg border p-3 sm:p-4">
              <h3 className="font-semibold text-sm sm:text-base">Features & Limitations</h3>
              <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                <p><strong>✓ Works offline:</strong> 3D navigation, interactions, menu display</p>
                <p><strong>✗ Requires backend:</strong> Contact form submissions</p>
                <p><strong>Note:</strong> For full functionality, host on Internet Computer or configure backend separately</p>
              </div>
            </div>

            <div className="rounded-lg bg-muted/50 p-3 sm:p-4">
              <h3 className="mb-2 font-semibold text-sm sm:text-base">Need Help?</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                For detailed setup instructions, see the included README-elementor.txt file
                in the download package.
              </p>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
