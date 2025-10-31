import { errorResponseSchema } from 'validator';
import { ApiError } from './apiError';
import { captureException } from '@sentry/react';

// NOTE: Content-Type: application/json のレスポンスのみを想定
const getBody = <T>(c: Response | Request): Promise<T> => {
  const contentType = c.headers.get('content-type');

  if (contentType && contentType.includes('application/json')) {
    return c.json();
  }
  return c.text() as Promise<T>;
};

// NOTE: ベースURLを設定
const getUrl = (contextUrl: string): string => {
  const baseUrl = import.meta.env.VITE_API_URL as string;
  const url = new URL(contextUrl, baseUrl);

  return url.toString();
};

// NOTE: Headerに追加したい場合はここで追加
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

  // fetch API
  const response = await fetch(requestUrl, requestInit);

  console.log('customFetch: response:', response.headers.get('content-type'));
  // error handling
  if (!response.ok) {
    try {
      const contentType = response.headers.get('content-type');

      console.log('customFetch: content-type:', contentType);

      if (contentType && contentType.includes('application/json')) {
        // content-type is 'application/json'
        console.log(`ResponseSchema: ${response.text()}`);

        const bodyText = await response.text();
        const errorBody = errorResponseSchema.parse(JSON.parse(bodyText));
        const apiError = new ApiError({
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          body: errorBody,
        });
        // send to Sentry
        captureException(apiError);
        // throw ApiError
        throw apiError;
      } else {
        // content-type is not 'application/json'
        console.error('customFetch: unexpected content-type in error response');
        const apiError = new ApiError({
          headers: response.headers,
          status: response.status,
          statusText: response.statusText,
          url: response.url,
          body: { status: -1, message: 'Undefined error response was reached' },
        });
        // send to Sentry
        captureException(apiError);
        // throw ApiError
        throw apiError;
      }
    } catch {
      console.error('customFetch: failed to parse error response');
      const apiError = new ApiError({
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
        body: { status: -1, message: 'Undefined error response was reached' },
      });
      // send to Sentry
      captureException(apiError);
      // throw ApiError
      throw apiError;
    }
  }
  // get body
  const data = await getBody<T>(response);

  return { status: response.status, data, headers: response.headers } as T;
};
