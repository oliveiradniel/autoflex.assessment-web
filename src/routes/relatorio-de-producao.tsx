import { createFileRoute } from '@tanstack/react-router';

import { ProductionReport } from '@/pages/production-report';

export const Route = createFileRoute('/relatorio-de-producao')({
  component: ProductionReport,
});
