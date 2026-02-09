import { FactoryIcon, PackageCheckIcon } from 'lucide-react';

import { truncateString } from '@/utils/truncate-string';
import { formatCurrency } from '@/utils/format-currency';
import { unitTypeFullLabel } from '@/pages/raw-material/unit-type-full-label';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import type { ProductionReport } from '@/types/production-report';

interface CardProps {
  productionReport: Omit<ProductionReport, 'productId'>;
}

export function ProductionReportCard({ productionReport }: CardProps) {
  const {
    productName,
    productCode,
    produceQuantity,
    totalValue,
    rawMaterials,
  } = productionReport;

  return (
    <div className="w-full max-w-75 rounded-md p-4 shadow-md">
      <div className="flex items-center gap-2">
        <PackageCheckIcon className="text-primary size-6" />

        <div className="flex flex-col">
          <span className="text-sm font-medium wrap-break-word whitespace-break-spaces">
            {truncateString(productName, 26)}
          </span>

          <span className="text-xs opacity-60">{productCode}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        <span className="text-xs">
          Quantidade produzível:{' '}
          <span className="font-medium">
            {produceQuantity} unidade{produceQuantity > 1 ? 's' : ''}
          </span>
        </span>

        <span className="text-xs">
          Valor total estimado:{' '}
          <span className="font-medium">{formatCurrency(totalValue)}</span>
        </span>
      </div>

      <Accordion type="single" collapsible className="mt-4">
        <AccordionItem value="raw-materials">
          <AccordionTrigger>
            <div className="text-primary flex items-center gap-1">
              <FactoryIcon className="size-4" /> Matérias primas necessárias
            </div>
          </AccordionTrigger>

          <AccordionContent className="pb-0">
            <Accordion type="multiple">
              {rawMaterials?.map(
                ({
                  rawMaterialId,
                  rawMaterialName,
                  rawMaterialCode,
                  rawMaterialUnitType,
                  consumedQuantity,
                  requiredQuantity,
                  initialStock,
                  remainingStock,
                }) => (
                  <AccordionItem key={rawMaterialId} value={rawMaterialId}>
                    <AccordionTrigger>
                      {truncateString(rawMaterialName, 20)}
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col gap-1 px-2">
                      <div className="mt-2 flex flex-col gap-1">
                        <div className="flex gap-1 text-xs">
                          <span>Código:</span>
                          <span className="font-medium">{rawMaterialCode}</span>
                        </div>

                        <div className="flex gap-1 text-xs">
                          <span>Consumo por unidade:</span>
                          <div className="flex gap-1 font-medium">
                            <span>{requiredQuantity}</span>
                            <span>
                              {unitTypeFullLabel[rawMaterialUnitType]}
                              {produceQuantity > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-1 text-xs">
                          <span>Consumo total:</span>
                          <div className="flex gap-1 font-medium">
                            <span>{consumedQuantity}</span>
                            <span>
                              {unitTypeFullLabel[rawMaterialUnitType]}
                              {produceQuantity > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-1 text-xs">
                          <span>Estoque antes:</span>
                          <div className="flex gap-1 font-medium">
                            <span>{initialStock}</span>
                            <span>
                              {unitTypeFullLabel[rawMaterialUnitType]}
                              {produceQuantity > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-1 text-xs">
                          <span>Estoque pós produção:</span>
                          <div className="flex gap-1 font-medium">
                            <span>{remainingStock}</span>
                            <span>
                              {unitTypeFullLabel[rawMaterialUnitType]}
                              {remainingStock > 1 ? 's' : ''}
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ),
              )}
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
