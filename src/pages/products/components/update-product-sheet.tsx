import { useQueryClient } from '@tanstack/react-query';
import { useForm, type Resolver } from 'react-hook-form';
import { useListRawMaterialsQuery } from '@/hooks/queries/use-list-raw-materials-query';
import { useUpdateProductMutation } from '@/hooks/mutations/use-update-product-mutation';

import { AxiosError } from 'axios';

import { toast } from '@/components/toast';

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

import type { Product } from '@/entities/product';
import type { ProductFormData } from '@/types/product-form-data';

interface UpdateProductSheetProps {
  product: Product;
}

export function UpdateProductSheet({ product }: UpdateProductSheetProps) {
  const queryClient = useQueryClient();

  const { rawMaterialList } = useListRawMaterialsQuery();
  const { updateProduct, isUpdatingProduct } = useUpdateProductMutation();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductUpdateSchema) as Resolver<ProductFormData>,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: product,
  });

  const handleSubmit = form.handleSubmit(async (data: ProductUpdateData) => {
    try {
      const updatedProduct = await updateProduct({ id: product.id, data });

      queryClient.setQueryData<Product[]>(['products'], (old) => {
        if (!old) return [];

        return old?.map((p) => (p.id === product.id ? updatedProduct : p));
      });

      queryClient.invalidateQueries({ queryKey: ['summary-product'] });
      queryClient.invalidateQueries({ queryKey: ['production-report'] });
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.error;

        if (errorMessage === 'This code already in use.') {
          toast({
            type: 'error',
            description: `O código "${form.getValues().code}" já está em uso.`,
          });
        }

        if (errorMessage === 'This name already in use.') {
          toast({
            type: 'error',
            description: `O nome "${form.getValues().name}" já está em uso.`,
          });
        }
      }

      toast({
        type: 'error',
        description: `Não foi possível atualizar o produto "${form.getValues().name}". Tente novamente mais tarde.`,
      });
    }
  });

  const isValidForm = form.formState.isValid;

  return (
    <SheetLayout
      trigger={
        <Button
          aria-label="Editar produto"
          title="Editar produto"
          variant="ghost"
          size="icon-xs"
        >
          <EditIcon aria-hidden="true" className="size-4 text-blue-500" />
        </Button>
      }
      title="Atualizar produto"
      description="Altere as informações do produto e ajuste as matérias-primas utilizadas em sua composição."
      footer={
        <>
          <Button
            type="submit"
            form="update-product-form"
            disabled={!isValidForm || isUpdatingProduct}
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
