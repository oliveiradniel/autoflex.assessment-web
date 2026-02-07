import { CheckIcon, PackageIcon, XIcon } from 'lucide-react';

import {
  InformationCards,
  type InformationCardsProps,
} from './components/InformationCards';

export function Home() {
  const informations: InformationCardsProps['informations'] = [
    {
      id: 'total-products',
      label: 'Total de Produtos',
      value: 1000,
      Icon: PackageIcon,
    },
    {
      id: 'active-products',
      label: 'Produtos Ativos',
      value: 80,
      Icon: CheckIcon,
    },
    {
      id: 'inactive-products',
      label: 'Produtos Inativos',
      value: 20,
      Icon: XIcon,
    },
  ];

  return (
    <div className="p-4">
      <header>
        <InformationCards informations={informations} />
      </header>
    </div>
  );
}
