import { cn } from '@/lib/utils';
import { CheckIcon, InfoIcon, XIcon } from 'lucide-react';

import { toast as sonnerToast } from 'sonner';

interface ToastProps {
  id: string | number;
  type: 'success' | 'error' | 'info';
  description: string;
}

export function Toast({ id, type, description }: ToastProps) {
  return (
    <button
      type="button"
      onClick={() => sonnerToast.dismiss(id)}
      className="bg-background relative flex items-center gap-4 overflow-hidden rounded-xl px-4 py-4 shadow-sm"
    >
      {type === 'success' ? (
        <div className="rounded-md bg-green-600/6 p-2">
          <CheckIcon className="size-4 text-green-500" />
        </div>
      ) : type === 'error' ? (
        <div className="rounded-md bg-red-600/6 p-2">
          <XIcon className="size-4 text-red-500" />
        </div>
      ) : (
        type === 'info' && (
          <div className="rounded-md bg-blue-600/6 p-2">
            <InfoIcon className="size-4 text-blue-500" />
          </div>
        )
      )}

      <div
        className={cn(
          'absolute left-0 h-full w-10 blur-2xl',
          type === 'success' && 'bg-green-500',
          type === 'error' && 'bg-red-500',
          type === 'info' && 'bg-blue-500',
        )}
      />

      <div className="flex flex-col items-start">
        <span className="text-sm font-medium">
          {type === 'error'
            ? 'Erro'
            : type === 'success'
              ? 'Sucesso'
              : 'Informação'}
        </span>

        <span className="text-start text-sm opacity-70">{description}</span>
      </div>
    </button>
  );
}
