import * as RdxRadioGroup from '@radix-ui/react-radio-group';

import { CheckCircle2, Circle } from 'lucide-react';

function RadioGroup(props: RdxRadioGroup.RadioGroupProps) {
  return (
    <RdxRadioGroup.RadioGroup {...props} className="flex flex-col gap-2" />
  );
}

function RadioGroupItem(props: RdxRadioGroup.RadioGroupItemProps) {
  return (
    <RdxRadioGroup.RadioGroupItem
      {...props}
      className="group border-input data-[state=checked]:border-primary focus-visible:border-primary ring-primary/10 hover:bg-primary/4 data-[state=checked]:bg-primary/5 flex cursor-pointer items-center rounded-lg border px-4 py-2.5 text-xs shadow-xs transition-colors duration-300 ease-linear outline-none focus-visible:ring-4"
    />
  );
}

function RadioGroupIndicator() {
  return (
    <>
      <Circle className="text-input size-4 group-data-[state=checked]:hidden" />
      <CheckCircle2 className="text-primary hidden size-4 group-data-[state=checked]:inline" />
    </>
  );
}

export { RadioGroup, RadioGroupItem, RadioGroupIndicator };
