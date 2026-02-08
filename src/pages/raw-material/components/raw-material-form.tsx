import { Controller, useFormState, type UseFormReturn } from 'react-hook-form';

import { unitTypeFullLabel } from '../unit-type-full-label';
import { unitTypeShortLabel } from '@/pages/products/unit-type-short-label';

import { FormGroup } from '@/components/form-group';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from '@/components/ui/radio-group';

import { UnitType } from '@/enums/unit-type';
import type { RawMaterialFormData } from '@/types/raw-material-form.data';

interface ProductFormProps {
  form: UseFormReturn<RawMaterialFormData>;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
  mode: 'create' | 'update';
}

export function RawMaterialForm({
  form,
  handleSubmit,
  isSubmitting,
  mode,
}: ProductFormProps) {
  const { errors } = useFormState({ control: form.control });

  const unitTypeList = Object.values(UnitType);

  return (
    <form
      id={`${mode}-product-form`}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 overflow-y-auto p-4"
    >
      <FormGroup error={errors.name?.message as string}>
        <Label htmlFor="name">Nome</Label>

        <Input
          id="name"
          disabled={isSubmitting}
          placeholder="Ex.: Corante Vermelho"
          {...form.register('name')}
        />
      </FormGroup>

      <FormGroup error={errors.code?.message as string}>
        <Label htmlFor="code">Código</Label>

        <Input
          id="code"
          disabled={isSubmitting}
          placeholder="Ex.: RM-004"
          {...form.register('code')}
        />
      </FormGroup>

      <FormGroup error={errors.stockQuantity?.message as string}>
        <Label htmlFor="stock-quantity">Quantidade</Label>

        <Input
          id="stock-quantity"
          type="number"
          disabled={isSubmitting}
          placeholder="0"
          {...form.register('stockQuantity')}
        />
      </FormGroup>

      {mode === 'create' && (
        <FormGroup error={errors.unitType?.message as string}>
          <Label htmlFor="unit-type">Tipo de unidade</Label>

          <Controller
            control={form.control}
            name="unitType"
            render={({ field: { value, onChange } }) => (
              <RadioGroup id="unit-type" value={value} onValueChange={onChange}>
                {unitTypeList.map((unitType) => (
                  <RadioGroupItem key={unitType} value={unitType}>
                    <RadioGroupIndicator />

                    <div className="ml-4 flex w-full justify-between">
                      <span className="text-xs font-medium">
                        {unitTypeShortLabel[unitType]}
                      </span>

                      <span className="text-xs">
                        {unitTypeFullLabel[unitType]}
                      </span>
                    </div>
                  </RadioGroupItem>
                ))}
              </RadioGroup>
            )}
          />
        </FormGroup>
      )}
    </form>
  );
}
