import type z from 'zod';

import { RawMaterialCreateSchema } from './raw-material-create-schema';

export const RawMaterialUpdateSchema = RawMaterialCreateSchema.partial();

export type RawMaterialUpdateData = z.infer<typeof RawMaterialUpdateSchema>;
