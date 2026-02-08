import { createFileRoute } from '@tanstack/react-router';

import { RawMaterial } from '@/pages/raw-material';

export const Route = createFileRoute('/materias-primas')({
  component: RawMaterial,
});
