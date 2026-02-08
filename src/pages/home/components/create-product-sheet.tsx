import { Controller, useForm, type Resolver } from 'react-hook-form';
import { useListRawMaterialsQuery } from '@/hooks/queries/use-list-raw-materials-query';

import { zodResolver } from '@hookform/resolvers/zod';

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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

import {
  ProductCreateSchema,
  type ProductCreateData,
} from '@/schemas/product/product-create-schema';

export function CreateProductSheet() {
  const { rawMaterialList } = useListRawMaterialsQuery();

  const form = useForm<ProductCreateData>({
    resolver: zodResolver(ProductCreateSchema) as Resolver<ProductCreateData>,
  });

  const handleSubmit = form.handleSubmit((data: ProductCreateData) => {
    console.log(data);
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

  const unitTypeLabels = {
    KG: 'kg',
    G: 'grama',
    L: 'litro',
    ML: 'mililitro',
    UNIT: 'unidade',
    PACK: 'pacote',
    BOX: 'caixa',
    ROLL: 'rolo',
    SHEET: 'papel',
    M: 'metro',
    CM: 'centímetro',
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Adicionar Produto</Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cadastrar produto</SheetTitle>
          <SheetDescription>
            Inclua um novo produto e gerencie seu estoque da melhor forma.
          </SheetDescription>
        </SheetHeader>

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
              {...form.register('name')}
            />
          </FormGroup>

          <FormGroup error={codeErrorMessage}>
            <Label htmlFor="code">Código</Label>

            <Input
              id="code"
              placeholder="Ex.: P-011"
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
                      const material = value.find(
                        (m) => m.rawMaterialId === id,
                      );

                      return (
                        <li key={id} className="flex items-center gap-1">
                          <Checkbox
                            checked={!!material}
                            label={`${name} - ${unitTypeLabels[unitType]} `}
                            onCheckedChange={(checked) =>
                              toggleMaterial(id, Boolean(checked))
                            }
                          />

                          <Input
                            type="number"
                            min={0.01}
                            step={0.01}
                            disabled={!material}
                            value={material?.quantityNeeded ?? ''}
                            placeholder="Quantidade necessária"
                            onChange={(e) =>
                              changeQuantity(id, Number(e.target.value))
                            }
                            className="w-40"
                          />
                        </li>
                      );
                    })}
                  </ul>
                );
              }}
            />
          </div>
        </form>

        <SheetFooter>
          <Button
            type="submit"
            form="create-product-form"
            disabled={!isValidForm}
          >
            Cadastrar
          </Button>

          <SheetClose asChild>
            <Button variant="outline">Cancelar</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
