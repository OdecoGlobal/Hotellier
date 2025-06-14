import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { getCurrentUser } from '@/lib/auth-guard';
import { EllipsisVertical, Hotel } from 'lucide-react';
import Link from 'next/link';
import UserButton from './user-menu';

const Menu = async () => {
  const user = await getCurrentUser();

  return (
    <aside className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1 ">
        <Button asChild variant="ghost">
          <Link
            href={`${
              !user || user.role !== 'OWNER' ? '/signup-owner' : '/owner'
            }`}
          >
            <Hotel />
            List Your Hotel
          </Link>
        </Button>
        <UserButton />
      </nav>

      {/* Mobile */}
      <nav className="md:hidden">
        <Sheet>
          <SheetTrigger className="align-middle cursor-pointer">
            <EllipsisVertical />
          </SheetTrigger>
          <SheetContent className="space-y-2 flex flex-col items-center">
            <SheetTitle className="pt-2 ">Menu</SheetTitle>
            <Button asChild variant="ghost">
              <Link
                href={`${
                  !user || user.role !== 'OWNER' ? '/signup-owner' : '/owner'
                }`}
              >
                <Hotel />
                List Your Hotel
              </Link>
            </Button>
            <UserButton />

            <SheetDescription></SheetDescription>
          </SheetContent>
        </Sheet>
      </nav>
    </aside>
  );
};

export default Menu;
