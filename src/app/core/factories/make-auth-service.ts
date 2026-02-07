import { HttpClient } from '../infra/http-client';

import type { IHttpClient } from '../contracts/ihttp-client';

export function makeHttpClient(): IHttpClient {
  return new HttpClient();
}
