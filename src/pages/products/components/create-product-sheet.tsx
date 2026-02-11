import { useQueryClient } from '@tanstack/react-query';
import { useCreateProductMutation } from '@/hooks/mutations/use-create-product-mutation';
import { useListRawMaterialsQuery } from '@/hooks/queries/use-list-raw-materials-query';
import { useForm, type Resolver } from 'react-hook-form';

import { AxiosError } from 'axios';

import { toast } from '@/components/toast';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  ProductCreateSchema,
  type ProductCreateData,
} from '@/schemas/product/product-create-schema';

import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { SheetLayout } from '@/components/sheet-layout';
import { ProductForm } from './product-form';

import type { ProductFormData } from '@/types/product-form-data';
import type { Product } from '@/entities/product';

export function CreateProductSheet() {
  const queryClient = useQueryClient();

  const { rawMaterialList } = useListRawMaterialsQuery();
  const { createProduct, isCreatingProduct } = useCreateProductMutation();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductCreateSchema) as Resolver<ProductFormData>,
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const handleSubmit = form.handleSubmit(async (data: ProductCreateData) => {
    try {
      const createdProduct = await createProduct(data);

      queryClient.setQueryData<Product[]>(['products'], (old) => [
        createdProduct,
        ...(old ?? []),
      ]);

      queryClient.invalidateQueries({ queryKey: ['summary-product'] });
      queryClient.invalidateQueries({ queryKey: ['production-report'] });

      form.reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.error;

        if (errorMessage === 'This code already in use.') {
          return toast({
            type: 'error',
            description: `O código "${form.getValues().code}" já está em uso.`,
          });
        }

        if (errorMessage === 'This name already in use.') {
          return toast({
            type: 'error',
            description: `O nome "${form.getValues().name}" já está em uso.`,
          });
        }
      }

      toast({
        type: 'error',
        description: `Não foi possível adicionar o produto "${form.getValues().name}". Tente novamente mais tarde.`,
      });
    }
  });

  const isValidForm = form.formState.isValid;

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
      <ProductForm
        form={form}
        handleSubmit={handleSubmit}
        isSubmitting={isCreatingProduct}
        mode="create"
        rawMaterialList={rawMaterialList}
      />
    </SheetLayout>
  );
}
