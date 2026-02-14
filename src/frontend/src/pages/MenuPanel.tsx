import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Coffee, Croissant, Cake } from 'lucide-react';

interface MenuPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function MenuPanel({ open, onClose }: MenuPanelProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className="text-2xl">Our Menu</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="coffee" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="coffee" className="gap-2">
              <Coffee className="h-4 w-4" />
              Coffee
            </TabsTrigger>
            <TabsTrigger value="pastries" className="gap-2">
              <Croissant className="h-4 w-4" />
              Pastries
            </TabsTrigger>
            <TabsTrigger value="desserts" className="gap-2">
              <Cake className="h-4 w-4" />
              Desserts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="coffee" className="mt-6 space-y-4">
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

          <TabsContent value="pastries" className="mt-6 space-y-4">
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

          <TabsContent value="desserts" className="mt-6 space-y-4">
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
        </Tabs>
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
    <div className="flex items-start justify-between rounded-lg border p-4">
      <div className="flex-1">
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="ml-4 font-semibold text-primary">{price}</span>
    </div>
  );
}
