import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteRawMaterialMutation } from '@/hooks/mutations/use-delete-raw-material-mutation';
import { useGetInUseRawMaterials } from '@/hooks/queries/use-get-in-use-raw-materials-query';

import { toast } from '@/components/toast/toast';

import { Trash2Icon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

import type { RawMaterial } from '@/entities/raw-material';

interface DeleteRawMaterialAlertDialog {
  id: string;
  name: string;
}

export function DeleteRawMaterialAlertDialog({
  id,
  name,
}: DeleteRawMaterialAlertDialog) {
  const queryClient = useQueryClient();

  const { deleteRawMaterial, isDeletingRawMaterial } =
    useDeleteRawMaterialMutation();
  const { inUseRawMaterials, isFetchingInUseRawMaterials } =
    useGetInUseRawMaterials();

  const isRawMaterialInUse = inUseRawMaterials.includes(id);

  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false);

  async function handleDeleteProduct() {
    await deleteRawMaterial(id);

    queryClient.setQueryData<RawMaterial[]>(
      ['raw-materials'],
      (old) => old?.filter((rawMaterial) => rawMaterial.id !== id) ?? [],
    );

    queryClient.invalidateQueries({ queryKey: ['summary-product'] });

    setIsDeleteAlertDialogOpen(false);

    toast({
      type: 'info',
      description: `A matéria prima "${name}" foi excluída.`,
    });
  }

  return (
    <AlertDialog
      open={isDeleteAlertDialogOpen}
      onOpenChange={setIsDeleteAlertDialogOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          aria-label={
            isRawMaterialInUse
              ? 'Não é possível excluir: material vinculado a um produto'
              : 'Excluir matéria prima'
          }
          title={
            isRawMaterialInUse
              ? 'Não é possível excluir: material vinculado a um produto'
              : 'Excluir matéria prima'
          }
          variant="ghost"
          disabled={isRawMaterialInUse || isFetchingInUseRawMaterials}
          size="icon-xs"
          className="hover:bg-destructive/10"
        >
          <Trash2Icon aria-hidden="true" className="text-destructive size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Esta ação é irreversível</AlertDialogTitle>

          <AlertDialogDescription>
            Ela excluirá permanentemente sua matéria prima "{name}"
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={isDeletingRawMaterial}
            onClick={handleDeleteProduct}
          >
            {isDeletingRawMaterial ? (
              <span className="flex items-center gap-2">
                <Spinner /> Excluindo
              </span>
            ) : (
              'Excluir'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
