import { useUpdateRawMaterialMutation } from '@/hooks/mutations/use-update-raw-material-mutation';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, type Resolver } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  RawMaterialUpdateSchema,
  type RawMaterialUpdateData,
} from '@/schemas/raw-material/raw-material-update-schema';

import { EditIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { SheetClose } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { SheetLayout } from '@/components/sheet-layout';
import { RawMaterialForm } from './raw-material-form';

import type { RawMaterial } from '@/entities/raw-material';
import type { RawMaterialFormData } from '@/types/raw-material-form.data';

interface UpdateRawMaterialSheetProps {
  rawMaterial: RawMaterial;
}

export function UpdateRawMaterialSheet({
  rawMaterial,
}: UpdateRawMaterialSheetProps) {
  const queryClient = useQueryClient();

  const { updateRawMaterial, isUpdatingRawMaterial } =
    useUpdateRawMaterialMutation();

  const form = useForm<RawMaterialFormData>({
    resolver: zodResolver(
      RawMaterialUpdateSchema,
    ) as Resolver<RawMaterialFormData>,
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: rawMaterial,
  });

  const handleSubmit = form.handleSubmit(
    async (data: RawMaterialUpdateData) => {
      const updatedRawMaterial = await updateRawMaterial({
        id: rawMaterial.id,
        data,
      });

      queryClient.setQueryData<RawMaterial[]>(['raw-materials'], (old) => {
        if (!old) return [];

        return old?.map((rm) =>
          rm.id === rawMaterial.id ? updatedRawMaterial : rm,
        );
      });

      queryClient.invalidateQueries({ queryKey: ['summary-product'] });
      queryClient.invalidateQueries({ queryKey: ['production-report'] });
    },
  );

  const isValidForm = form.formState.isValid;

  return (
    <SheetLayout
      trigger={
        <Button variant="ghost" size="icon-xs">
          <EditIcon className="size-4 text-blue-500" />
        </Button>
      }
      title="Atualizar matéria-prima"
      description="Altere as informações do insumo conforme necessário para manter o controle do estoque sempre atualizado."
      footer={
        <>
          <Button
            type="submit"
            form="update-product-form"
            disabled={!isValidForm || isUpdatingRawMaterial}
          >
            {isUpdatingRawMaterial ? (
              <span className="flex items-center gap-2">
                Atualizando <Spinner />
              </span>
            ) : (
              'Atualizar'
            )}
          </Button>

          <SheetClose asChild>
            <Button variant="outline">
              {isUpdatingRawMaterial ? 'Fechar' : 'Cancelar'}
            </Button>
          </SheetClose>
        </>
      }
    >
      <RawMaterialForm
        form={form}
        handleSubmit={handleSubmit}
        isSubmitting={false}
        mode="update"
      />
    </SheetLayout>
  );
}
