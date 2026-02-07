import z from 'zod';

export const ProductCreateSchema = z.object({
  code: z
    .string()
    .min(1, 'O código do produto é obrigatório')
    .max(20, 'O código deve conter no máximo 20 caracteres.'),
  name: z.string().min(1, 'O nome do produto é obrigatório'),
  price: z.number().min(0.01, 'O preço do produto deve ser maior que zero'),
  description: z
    .string()
    .max(500, 'A descrição do produto deve conter no máximo 500 caracteres')
    .optional(),
});

export type ProductCreateData = z.infer<typeof ProductCreateSchema>;
