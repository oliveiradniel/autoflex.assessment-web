export interface HttpRequestConfig {
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

export abstract class IHttpClient {
  abstract get<TResponseType>(
    path: string,
    config?: HttpRequestConfig,
  ): Promise<TResponseType>;

  abstract post<TResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig,
  ): Promise<TResponseType>;

  abstract patch<TResponseType>(
    path: string,
    body?: unknown,
    config?: HttpRequestConfig,
  ): Promise<TResponseType>;

  abstract delete(path: string, config?: HttpRequestConfig): Promise<void>;
}
