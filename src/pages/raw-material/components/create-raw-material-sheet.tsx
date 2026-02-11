import { useForm, type Resolver } from 'react-hook-form';
import { useCreateRawMaterialMutation } from '@/hooks/mutations/use-create-raw-material-mutation';
import { useQueryClient } from '@tanstack/react-query';

import { AxiosError } from 'axios';

import { toast } from '@/components/toast';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  RawMaterialCreateSchema,
  type RawMaterialCreateData,
} from '@/schemas/raw-material/raw-material-create-schema';

import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { SheetLayout } from '@/components/sheet-layout';
import { RawMaterialForm } from './raw-material-form';

import type { RawMaterialFormData } from '@/types/raw-material-form.data';
import type { RawMaterial } from '@/entities/raw-material';

export function CreateRawMaterialSheet() {
  const queryClient = useQueryClient();

  const { createRawMaterial, isCreatingRawMaterial } =
    useCreateRawMaterialMutation();

  const form = useForm<RawMaterialFormData>({
    resolver: zodResolver(
      RawMaterialCreateSchema,
    ) as Resolver<RawMaterialFormData>,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      unitType: 'KG',
    },
  });

  const handleSubmit = form.handleSubmit(
    async (data: RawMaterialCreateData) => {
      try {
        const createdRawMaterial = await createRawMaterial(data);

        queryClient.setQueryData<RawMaterial[]>(['raw-materials'], (old) => [
          createdRawMaterial,
          ...(old ?? []),
        ]);

        queryClient.invalidateQueries({ queryKey: ['summary-product'] });
        queryClient.invalidateQueries({ queryKey: ['production-report'] });

        form.reset();
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
          description: `Não foi possível adicionar a matéria prima "${form.getValues().name}". Tente novamente mais tarde.`,
        });
      }
    },
  );

  const isValidForm = form.formState.isValid;

  return (
    <SheetLayout
      trigger={<Button>Adicionar Matéria Prisma</Button>}
      title="Cadastrar nova matéria prima"
      description="Preencha as informações abaixo para adicionar um novo insumo ao estoque e mantê-lo disponível para utilização na produção."
      footer={
        <>
          <Button
            type="submit"
            form="create-product-form"
            disabled={!isValidForm || isCreatingRawMaterial}
          >
            {isCreatingRawMaterial ? (
              <span className="flex items-center gap-2">
                Cadastrando <Spinner />
              </span>
            ) : (
              'Cadastrar'
            )}
          </Button>

          <SheetClose asChild>
            <Button variant="outline">
              {isCreatingRawMaterial ? 'Fechar' : 'Cancelar'}
            </Button>
          </SheetClose>
        </>
      }
    >
      <RawMaterialForm
        form={form}
        handleSubmit={handleSubmit}
        isSubmitting={isCreatingRawMaterial}
        mode="create"
      />
    </SheetLayout>
  );
}
