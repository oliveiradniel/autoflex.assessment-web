import { Spinner } from '@/components/ui/spinner';

interface InformationCard {
  label: string;
  value?: string | number;
  isLoading: boolean;
}

export function InformationCard({ label, value, isLoading }: InformationCard) {
  return (
    <div className="flex w-full items-center justify-between rounded-md p-4 shadow-md sm:max-w-75">
      <div className="flex flex-col gap-1">
        <span className="text-sm">{label}</span>

        <strong className="text-base">
          {isLoading ? <Spinner className="text-primary" /> : value}
        </strong>
      </div>
    </div>
  );
}
