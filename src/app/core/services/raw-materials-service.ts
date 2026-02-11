import type { RawMaterial } from '@/entities/raw-material';
import type { IRawMaterialService } from '../contracts/iraw-material-service';
import type { IHttpClient } from '../contracts/ihttp-client';
import type { RawMaterialCreateData } from '@/schemas/raw-material/raw-material-create-schema';
import type { RawMaterialUpdateData } from '@/schemas/raw-material/raw-material-update-schema';

export class RawMaterialsService implements IRawMaterialService {
  private readonly httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this.httpClient = httpClient;
  }

  list(): Promise<RawMaterial[]> {
    const rawMaterials = this.httpClient.get<RawMaterial[]>('/raw-materials');

    return rawMaterials;
  }

  findById(id: string): Promise<RawMaterial> {
    const rawMaterial = this.httpClient.get<RawMaterial>(
      `/raw-materials/${id}`,
    );

    return rawMaterial;
  }

  inUse(): Promise<string[]> {
    const inUseRawMaterials = this.httpClient.get<string[]>(
      '/raw-materials/in-use',
    );

    return inUseRawMaterials;
  }

  create(rawMaterial: RawMaterialCreateData): Promise<RawMaterial> {
    const createdRawMaterial = this.httpClient.post<RawMaterial>(
      '/raw-materials',
      rawMaterial,
    );

    return createdRawMaterial;
  }

  partialUpdate(
    id: string,
    rawMaterial: RawMaterialUpdateData,
  ): Promise<RawMaterial> {
    const updatedRawMaterial = this.httpClient.patch<RawMaterial>(
      `/raw-materials/${id}`,
      rawMaterial,
    );

    return updatedRawMaterial;
  }

  delete(id: string): Promise<void> {
    return this.httpClient.delete(`/raw-materials/${id}`);
  }
}
