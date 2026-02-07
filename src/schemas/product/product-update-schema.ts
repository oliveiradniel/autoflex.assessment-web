import type z from 'zod';

import { ProductCreateSchema } from './product-create-schema';

export const ProductUpdateSchema = ProductCreateSchema.partial().refine(
  (data) => Object.keys(data).length > 0,
  {
    error: 'Pelo menos um campo deve ser fornecido para atualização',
  },
);

export type ProductUpdateData = z.infer<typeof ProductUpdateSchema>;
