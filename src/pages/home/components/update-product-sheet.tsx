import { useListRawMaterialsQuery } from '@/hooks/queries/use-list-raw-materials-query';
import { useForm, type Resolver } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProductUpdateSchema,
  type ProductUpdateData,
} from '@/schemas/product/product-update-schema';

import { EditIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { SheetLayout } from '@/components/sheet-layout';
import { ProductForm } from './product-form';

import type { ProductFormData } from '@/types/product-form-data';

interface UpdateProductSheetProps {
  product: ProductUpdateData;
}

export function UpdateProductSheet({ product }: UpdateProductSheetProps) {
  const { rawMaterialList } = useListRawMaterialsQuery();

  const isUpdatingProduct = false;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductUpdateSchema) as Resolver<ProductFormData>,
    defaultValues: product,
  });

  const handleSubmit = form.handleSubmit(async (data: ProductUpdateData) => {
    console.log(data);
  });

  const isValidForm = form.formState.errors;

  return (
    <SheetLayout
      trigger={
        <Button variant="ghost" size="icon-xs">
          <EditIcon className="size-4 text-blue-500" />
        </Button>
      }
      title="Atualizar produto"
      description="Altere as informações do produto e ajuste as matérias-primas utilizadas em sua composição."
      footer={
        <>
          <Button
            type="submit"
            form="create-product-form"
            disabled={!isValidForm}
          >
            {isUpdatingProduct ? (
              <span className="flex items-center gap-2">
                Atualizando <Spinner />
              </span>
            ) : (
              'Atualizar'
            )}
          </Button>

          <SheetClose asChild>
            <Button variant="outline">
              {isUpdatingProduct ? 'Fechar' : 'Cancelar'}
            </Button>
          </SheetClose>
        </>
      }
    >
      <ProductForm
        form={form}
        handleSubmit={handleSubmit}
        isSubmitting={false}
        mode="update"
        rawMaterialList={rawMaterialList}
      />
    </SheetLayout>
  );
}
