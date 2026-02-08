import { createFileRoute } from '@tanstack/react-router';

import { Products } from '@/pages/products';

export const Route = createFileRoute('/produtos')({
  component: Products,
});
