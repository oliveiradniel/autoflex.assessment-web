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
import { useDeleteProductMutation } from '@/hooks/mutations/use-delete-product-mutation';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { useQueryClient } from '@tanstack/react-query';
import type { Product } from '@/entities/product';

interface DeleteProductAlertDialog {
  id: string;
  name: string;
}

export function DeleteProductAlertDialog({
  id,
  name,
}: DeleteProductAlertDialog) {
  const queryClient = useQueryClient();

  const { deleteProduct, isDeletingProduct } = useDeleteProductMutation();

  const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false);

  async function handleDeleteProduct() {
    await deleteProduct(id);

    queryClient.setQueryData<Product[]>(
      ['products'],
      (old) => old?.filter((product) => product.id !== id) ?? [],
    );

    setIsDeleteAlertDialogOpen(false);
  }

  return (
    <AlertDialog
      open={isDeleteAlertDialogOpen}
      onOpenChange={setIsDeleteAlertDialogOpen}
    >
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
          className="hover:bg-destructive/10"
        >
          <Trash2Icon className="text-destructive size-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Esta ação é irreversível</AlertDialogTitle>

          <AlertDialogDescription>
            Ela excluirá permanentemente o seu produto "{name}"
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            variant="destructive"
            disabled={isDeletingProduct}
            onClick={handleDeleteProduct}
          >
            {isDeletingProduct ? (
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
