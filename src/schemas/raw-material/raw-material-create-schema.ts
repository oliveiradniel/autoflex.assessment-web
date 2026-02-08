import { UnitType } from '@/enums/unit-type';
import z from 'zod';

export const RawMaterialCreateSchema = z.object({
  code: z
    .string()
    .min(1, 'O código do produto é obrigatório.')
    .max(20, 'O código deve conter no máximo 20 caracteres.'),
  name: z.string().min(1, 'O nome do produto é obrigatório.'),
  stockQuantity: z.coerce
    .number()
    .min(0.01, 'A quantidade no estoque deve ser maior que 0.'),
  unitType: z.enum(UnitType, { error: 'Tipo de unidade inválido.' }).optional(),
});

export type RawMaterialCreateData = z.infer<typeof RawMaterialCreateSchema>;
