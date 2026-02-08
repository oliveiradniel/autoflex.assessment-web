import { useQueryClient } from '@tanstack/react-query';
import { useCreateProductMutation } from '@/hooks/mutations/use-create-product-mutation';
import { useListRawMaterialsQuery } from '@/hooks/queries/use-list-raw-materials-query';
import { Controller, useForm, type Resolver } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProductCreateSchema,
  type ProductCreateData,
} from '@/schemas/product/product-create-schema';

import { AxiosError } from 'axios';

import { FormGroup } from '@/components/form-group';
import { Button } from '@/components/ui/button';
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
import { SheetClose } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Spinner } from '@/components/ui/spinner';
import { SheetLayout } from '@/components/sheet-layout';

import { unitTypeLabel } from '../uniTypeLabel';

import type { Product } from '@/entities/product';

export function CreateProductSheet() {
  const queryClient = useQueryClient();

  const { rawMaterialList } = useListRawMaterialsQuery();
  const { createProduct, isCreatingProduct } = useCreateProductMutation();

  const form = useForm<ProductCreateData>({
    resolver: zodResolver(ProductCreateSchema) as Resolver<ProductCreateData>,
  });

  const handleSubmit = form.handleSubmit(async (data: ProductCreateData) => {
    try {
      const createdProduct = await createProduct(data);

      queryClient.setQueryData<Product[]>(['products'], (old) => [
        createdProduct,
        ...(old ?? []),
      ]);

      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.error;

        console.log(errorMessage);
      }
    }
  });

  const description = form.watch('description') ?? '';

  const {
    name: nameError,
    code: codeError,
    price: priceError,
    description: descriptionError,
    materials: materialsError,
  } = form.formState.errors;

  const nameErrorMessage = nameError?.message;
  const codeErrorMessage = codeError?.message;
  const priceErrorMessage = priceError?.message;
  const descriptionErrorMessage = descriptionError?.message;
  const materialErrorMessage = materialsError;

  const isValidForm =
    !nameErrorMessage &&
    !codeErrorMessage &&
    !priceErrorMessage &&
    !descriptionErrorMessage &&
    !materialErrorMessage;

  return (
    <SheetLayout
      trigger={<Button>Adicionar Produto</Button>}
      title="Cadastrar novo produto"
      description="Preencha as informações abaixo para adicionar um novo produto ao catálogo e definir as matérias-primas necessárias para sua produção."
      footer={
        <>
          <Button
            type="submit"
            form="create-product-form"
            disabled={!isValidForm || isCreatingProduct}
          >
            {isCreatingProduct ? (
              <span className="flex items-center gap-2">
                Cadastrando <Spinner />
              </span>
            ) : (
              'Cadastrar'
            )}
          </Button>

          <SheetClose asChild>
            <Button variant="outline">
              {isCreatingProduct ? 'Fechar' : 'Cancelar'}
            </Button>
          </SheetClose>
        </>
      }
    >
      <form
        id="create-product-form"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 overflow-y-auto p-4"
      >
        <FormGroup error={nameErrorMessage}>
          <Label htmlFor="name">Nome</Label>

          <Input
            id="name"
            placeholder="Ex.: Copo Descartável 200ml"
            disabled={isCreatingProduct}
            {...form.register('name')}
          />
        </FormGroup>

        <FormGroup error={codeErrorMessage}>
          <Label htmlFor="code">Código</Label>

          <Input
            id="code"
            placeholder="Ex.: P-011"
            disabled={isCreatingProduct}
            {...form.register('code')}
          />
        </FormGroup>

        <FormGroup error={priceErrorMessage}>
          <Label htmlFor="price">Preço</Label>

          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>R$</InputGroupText>
            </InputGroupAddon>

            <InputGroupInput
              id="price"
              type="number"
              placeholder="0.00"
              disabled={isCreatingProduct}
              {...form.register('price')}
            />

            <InputGroupAddon align="inline-end">
              <InputGroupText>BRL</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <FormGroup error={descriptionErrorMessage}>
          <Label htmlFor="description">Descrição</Label>

          <InputGroup>
            <InputGroupTextarea
              id="description"
              maxLength={500}
              placeholder="Descreva detalhes sobre o produto"
              disabled={isCreatingProduct}
              {...form.register('description')}
            />

            <InputGroupAddon align="block-end">
              <InputGroupText className="text-xs">
                {description.length ?? 0}/500
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <Separator />

        <div>
          <Label>Matérias primas necessárias</Label>

          {materialsError && (
            <span className="text-destructive text-xs">
              A quantidade necessária deve ser maior que 0.
            </span>
          )}

          <Controller
            name="materials"
            control={form.control}
            render={({ field: { value = [], onChange } }) => {
              function toggleMaterial(id: string, checked: boolean) {
                if (checked) {
                  onChange([
                    ...value,
                    { rawMaterialId: id, quantityNeeded: 1 },
                  ]);
                } else {
                  onChange(
                    value.filter((material) => material.rawMaterialId !== id),
                  );
                }
              }

              function changeQuantity(id: string, quantity: number) {
                onChange(
                  value.map((m) =>
                    m.rawMaterialId === id
                      ? { ...m, quantityNeeded: quantity }
                      : m,
                  ),
                );
              }

              return (
                <ul className="mt-4 flex flex-col gap-2">
                  {rawMaterialList.map(({ id, unitType, name }) => {
                    const material = value.find((m) => m.rawMaterialId === id);

                    return (
                      <li key={id} className="flex items-center gap-1">
                        <Checkbox
                          checked={!!material}
                          label={`${name}`}
                          disabled={isCreatingProduct}
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
                              min={0.01}
                              step={0.01}
                              disabled={!material || isCreatingProduct}
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
        </div>
      </form>
    </SheetLayout>
  );
}
