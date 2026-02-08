import * as CheckboxRdx from '@radix-ui/react-checkbox';

import { Square, SquareCheck } from 'lucide-react';

export function Checkbox({
  label,
  ...props
}: CheckboxRdx.CheckboxProps & { label: string }) {
  return (
    <CheckboxItem {...props}>
      <CheckboxIndicator />

      <span className="pl-4 text-end text-xs">{label}</span>
    </CheckboxItem>
  );
}

export function CheckboxItem(props: CheckboxRdx.CheckboxProps) {
  return (
    <CheckboxRdx.Root
      {...props}
      className="group border-primary/40 data-[state=checked]:border-primary data-[state=checked]:bg-primary/10 ring-primary/10 focus-visible:border-primary enabled:hover:border-primary/60 hover:bg-primary/4 flex w-full items-center justify-between rounded-lg border px-4 py-2.5 transition-colors duration-300 ease-linear outline-none focus-visible:ring-4 enabled:cursor-pointer disabled:opacity-50"
    >
      {props.children}
    </CheckboxRdx.Root>
  );
}

export function CheckboxIndicator() {
  return (
    <>
      <Square className="text-primary size-4 group-data-[state=checked]:hidden" />
      <SquareCheck className="text-primary size-4 group-data-[state=checked]:inline group-data-[state=unchecked]:hidden" />
    </>
  );
}
