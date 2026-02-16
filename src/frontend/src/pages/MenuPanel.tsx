import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Coffee, Croissant, Cake } from 'lucide-react';

interface MenuPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuPanel({ open, onClose }: MenuPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent 
        side="right" 
        className="w-full sm:max-w-xl flex flex-col p-0 safe-top safe-bottom"
        style={{ maxHeight: 'var(--app-height, 100dvh)' }}
      >
        <SheetHeader className="px-4 py-4 sm:px-6 sm:py-6 border-b shrink-0">
          <SheetTitle className="text-xl sm:text-2xl">Our Menu</SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="coffee" className="flex flex-col h-full">
            <TabsList className="grid w-full grid-cols-3 mx-4 mt-4 sm:mx-6 sm:mt-6 shrink-0">
              <TabsTrigger value="coffee" className="gap-1 text-xs sm:text-sm sm:gap-2">
                <Coffee className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Coffee</span>
              </TabsTrigger>
              <TabsTrigger value="pastries" className="gap-1 text-xs sm:text-sm sm:gap-2">
                <Croissant className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Pastries</span>
              </TabsTrigger>
              <TabsTrigger value="desserts" className="gap-1 text-xs sm:text-sm sm:gap-2">
                <Cake className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">Desserts</span>
              </TabsTrigger>
            </TabsList>

            <ScrollArea className="flex-1 px-4 sm:px-6">
              <TabsContent value="coffee" className="mt-4 space-y-3 pb-4 sm:mt-6 sm:space-y-4">
                <MenuItem
                  name="Espresso"
                  description="Rich and bold single shot"
                  price="$3.50"
                />
                <MenuItem
                  name="Cappuccino"
                  description="Espresso with steamed milk and foam"
                  price="$4.50"
                />
                <MenuItem
                  name="Latte"
                  description="Smooth espresso with steamed milk"
                  price="$4.75"
                />
                <MenuItem
                  name="Americano"
                  description="Espresso with hot water"
                  price="$3.75"
                />
                <MenuItem
                  name="Cold Brew"
                  description="Smooth, refreshing cold coffee"
                  price="$4.25"
                />
              </TabsContent>

              <TabsContent value="pastries" className="mt-4 space-y-3 pb-4 sm:mt-6 sm:space-y-4">
                <MenuItem
                  name="Croissant"
                  description="Buttery, flaky French pastry"
                  price="$3.25"
                />
                <MenuItem
                  name="Pain au Chocolat"
                  description="Croissant with dark chocolate"
                  price="$3.75"
                />
                <MenuItem
                  name="Almond Croissant"
                  description="Filled with almond cream"
                  price="$4.25"
                />
                <MenuItem
                  name="Blueberry Muffin"
                  description="Fresh baked with real blueberries"
                  price="$3.50"
                />
              </TabsContent>

              <TabsContent value="desserts" className="mt-4 space-y-3 pb-4 sm:mt-6 sm:space-y-4">
                <MenuItem
                  name="Tiramisu"
                  description="Classic Italian coffee-flavored dessert"
                  price="$6.50"
                />
                <MenuItem
                  name="Chocolate Cake"
                  description="Rich, moist chocolate layer cake"
                  price="$5.75"
                />
                <MenuItem
                  name="Cheesecake"
                  description="Creamy New York style"
                  price="$6.25"
                />
                <MenuItem
                  name="Fruit Tart"
                  description="Fresh seasonal fruits on pastry cream"
                  price="$5.50"
                />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MenuItemProps {
  name: string;
  description: string;
  price: string;
}

function MenuItem({ name, description, price }: MenuItemProps) {
  return (
    <div className="flex items-start justify-between rounded-lg border p-3 sm:p-4">
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-foreground text-sm sm:text-base">{name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="ml-3 font-semibold text-primary shrink-0 text-sm sm:text-base">{price}</span>
    </div>
  );
}
