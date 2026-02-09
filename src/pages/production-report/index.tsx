import { useCalculateProductionMutation } from '@/hooks/queries/use-calculate-production-mutation';

import { InformationCard } from './components/information-card';
import { Spinner } from '@/components/ui/spinner';
import { ProductionReportCard } from './components/production-report-card';

export function ProductionReport() {
  const { productionReport, isFetchingProductReport } =
    useCalculateProductionMutation();

  return (
    <div className="p-4">
      <header className="flex flex-col gap-8">
        <InformationCard
          label="Produtos viáveis com o estoque atual"
          value={productionReport?.length ?? 0}
          isLoading={isFetchingProductReport}
        />

        <div>
          <div className="flex gap-4">
            <h1 className="text-base font-bold">Planejamento de Produção</h1>

            {isFetchingProductReport && <Spinner />}
          </div>

          <p className="text-sm">
            Veja quais produtos podem ser produzidos com o estoque disponível de
            matérias-primas.
          </p>
        </div>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {productionReport.map((report) => (
          <ProductionReportCard
            key={report.productId}
            productionReport={report}
          />
        ))}
      </div>
    </div>
  );
}
