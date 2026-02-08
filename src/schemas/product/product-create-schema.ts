import z from 'zod';

export const materialSchema = z.object({
  rawMaterialId: z.string().uuid('Matéria-prima inválida'),

  quantityNeeded: z.coerce
    .number({ error: 'A quantidade necessária deve ser um número.' })
    .positive({ error: 'A quantidade necessária deve ser maior que 0.' }),
});

export const ProductCreateSchema = z.object({
  code: z
    .string()
    .min(1, 'O código do produto é obrigatório.')
    .max(20, 'O código deve conter no máximo 20 caracteres.'),
  name: z.string().min(1, 'O nome do produto é obrigatório.'),
  price: z.coerce
    .number({ error: 'O preço do produto deve ser um número.' })
    .positive({ error: 'O preço do produto deve ser maior que zero.' }),
  isActive: z
    .boolean({
      error: 'O status do produto deve ser verdadeiro ou falso.',
    })
    .default(true),
  description: z
    .string()
    .max(500, 'A descrição do produto deve conter no máximo 500 caracteres.')
    .optional(),
  materials: z.array(materialSchema).optional(),
});

export type ProductCreateData = z.infer<typeof ProductCreateSchema>;
