import { errorResponseSchema } from 'paycrew-validator';
import { ApiError } from './apiError';
import { captureException } from '@sentry/react';

// NOTE: Supports cases where `content-type` is other than `json`
const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return c.json();
  }
  return c.text() as Promise<T>;
};

// NOTE: Update just base url
const getUrl = (contextUrl: string): string => {
  const baseUrl = import.meta.env.VITE_API_URL as string;
  const url = new URL(contextUrl, baseUrl);

  return url.toString();
};

// NOTE: Add headers
const getHeaders = (headers?: HeadersInit): HeadersInit => {
  return {
    ...headers,
  };
};

export const customFetch = async <T>(url: string, options: RequestInit): Promise<T> => {
  const requestUrl = getUrl(url);
  const requestHeaders = getHeaders(options.headers);
  const requestInit: RequestInit = {
    ...options,
    headers: requestHeaders,
  };

  // fetch process
  const response = await fetch(requestUrl, requestInit);
  // error handling
  if (!response.ok) {
    try {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const bodyText = await response.text();
        const errorBody = errorResponseSchema.parse(JSON.parse(bodyText));
        const apiError = new ApiError({
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          body: errorBody,
        });
        captureException(apiError);
        throw apiError;
      } else {
        const apiError = new ApiError({
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          body: { status: -1, message: 'Undefined error response was reached' },
        });
        captureException(apiError);
        throw apiError;
      }
    } catch {
      const apiError = new ApiError({
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: { status: -1, message: 'Undefined error response was reached' },
      });
      captureException(apiError);
      throw apiError;
    }
  }
  // get body
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
};
