import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface SheetLayoutProps {
  trigger: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function SheetLayout({
  title,
  description,
  trigger,
  children,
  footer,
}: SheetLayoutProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        {children}

        <SheetFooter>{footer}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
