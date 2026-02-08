import { Controller, useWatch, type UseFormReturn } from 'react-hook-form';

import { cn } from '@/lib/utils';
import { unitTypeLabel } from '../uniTypeLabel';
import { formatCurrency } from '@/utils/format-currency';
import { parseCurrency } from '@/utils/parse-currency';

import { FormGroup } from '@/components/form-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

import type { RawMaterial } from '@/entities/raw-material';
import type { ProductFormData } from '@/types/product-form-data';

interface ProductFormProps {
  form: UseFormReturn<ProductFormData>;
  rawMaterialList: RawMaterial[];
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
  mode: 'create' | 'update';
}

export function ProductForm({
  form,
  rawMaterialList,
  handleSubmit,
  isSubmitting,
  mode,
}: ProductFormProps) {
  const description =
    useWatch({
      control: form.control,
      name: 'description',
    }) ?? '';
  const errors = form.formState.errors;

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
          placeholder="Ex.: Copo Descartável 200ml"
          {...form.register('name')}
        />
      </FormGroup>

      <FormGroup error={errors.code?.message as string}>
        <Label htmlFor="code">Código</Label>

        <Input
          id="code"
          disabled={isSubmitting}
          placeholder="Ex.: P-011"
          {...form.register('code')}
        />
      </FormGroup>

      <FormGroup error={errors.price?.message as string}>
        <Label htmlFor="price">Preço</Label>

        <InputGroup>
          <Controller
            control={form.control}
            name="price"
            render={({ field: { value, onChange } }) => (
              <InputGroupInput
                type="text"
                inputMode="numeric"
                disabled={isSubmitting}
                placeholder="0,00"
                value={formatCurrency(value ?? 0)}
                onChange={(event) => {
                  const parsed = parseCurrency(event.target.value);

                  onChange(parsed);
                }}
              />
            )}
          />

          <InputGroupAddon align="inline-end">
            <InputGroupText>BRL</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>

      {mode === 'update' && (
        <Controller
          name="isActive"
          control={form.control}
          render={({ field }) => (
            <div className="flex items-center justify-between">
              <Switch checked={field.value} onCheckedChange={field.onChange} />

              <div
                className={cn(
                  'rounded-md px-4 py-2 text-xs font-semibold',
                  field.value
                    ? 'bg-green-500/10 text-green-600'
                    : 'bg-red-500/10 text-red-600',
                )}
              >
                {field.value ? 'Ativo' : 'Inativo'}
              </div>
            </div>
          )}
        />
      )}

      <FormGroup error={errors.description?.message as string}>
        <Label>Descrição</Label>
        <InputGroup>
          <InputGroupTextarea
            maxLength={500}
            disabled={isSubmitting}
            placeholder="Descreva detalhes sobre o produto"
            {...form.register('description')}
          />
          <InputGroupAddon align="block-end">
            <InputGroupText className="text-xs">
              {description.length}/500
            </InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </FormGroup>

      <Separator />

      <Controller
        name="materials"
        control={form.control}
        render={({ field: { value = [], onChange } }) => {
          function toggleMaterial(id: string, checked: boolean) {
            if (checked) {
              onChange([...value, { rawMaterialId: id, quantityNeeded: 1 }]);
            } else {
              onChange(
                value.filter((material) => material.rawMaterialId !== id),
              );
            }
          }

          function changeQuantity(id: string, quantity: number) {
            onChange(
              value.map((material) =>
                material.rawMaterialId === id
                  ? { ...material, quantityNeeded: quantity }
                  : material,
              ),
            );
          }

          return (
            <ul className="flex flex-col gap-2">
              {rawMaterialList.map(({ id, unitType, name }) => {
                const material = value.find(
                  (material) => material.rawMaterialId === id,
                );

                return (
                  <li key={id} className="flex items-center gap-2">
                    <Checkbox
                      checked={!!material}
                      label={`${name}`}
                      onCheckedChange={(checked) =>
                        toggleMaterial(id, Boolean(checked))
                      }
                    />

                    <InputGroup className="w-60">
                      <InputGroupAddon>
                        <InputGroupText>
                          {unitTypeLabel[unitType]}
                        </InputGroupText>
                        <InputGroupInput
                          type="number"
                          disabled={!material || isSubmitting}
                          value={material?.quantityNeeded ?? ''}
                          onChange={(e) =>
                            changeQuantity(id, Number(e.target.value))
                          }
                        />
                      </InputGroupAddon>
                    </InputGroup>
                  </li>
                );
              })}
            </ul>
          );
        }}
      />
    </form>
  );
}
