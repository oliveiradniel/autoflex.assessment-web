import { RawMaterialsService } from '../services/raw-materials-service';

import { makeHttpClient } from './make-auth-service';

import type { IRawMaterialService } from '../contracts/iraw-material-service';

export function makeRawMaterialsService(): IRawMaterialService {
  return new RawMaterialsService(makeHttpClient());
}
