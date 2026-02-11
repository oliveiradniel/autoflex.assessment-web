import { toast as sonnerToast } from 'sonner';
import { Toast } from '.';

interface ToastProps {
  id: string | number;
  type: 'success' | 'error' | 'info';
  description: string;
}

export function toast({ type, description }: Omit<ToastProps, 'id'>) {
  return sonnerToast.custom((id) => (
    <Toast id={id} type={type} description={description} />
  ));
}
