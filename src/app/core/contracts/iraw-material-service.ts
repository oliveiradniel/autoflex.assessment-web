import type { RawMaterial } from '@/entities/raw-material';

import type { RawMaterialCreateData } from '@/schemas/raw-material/raw-material-create-schema';
import type { RawMaterialUpdateData } from '@/schemas/raw-material/raw-material-update-schema';

export abstract class IRawMaterialService {
  abstract list(): Promise<RawMaterial[]>;

  abstract findById(id: string): Promise<RawMaterial>;

  abstract inUse(): Promise<string[]>;

  abstract create(rawMaterial: RawMaterialCreateData): Promise<RawMaterial>;

  abstract partialUpdate(
    id: string,
    rawMaterial: RawMaterialUpdateData,
  ): Promise<RawMaterial>;

  abstract delete(id: string): Promise<void>;
}
