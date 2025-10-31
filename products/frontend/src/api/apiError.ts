import type { ErrorResponseSchemaType } from 'validator';

// 参考サイト： https://zenn.dev/praha/articles/a8b72ba36294fe
export class ApiError extends Error {
  headers: Readonly<Headers>;
  status: Readonly<number>;
  statusText: Readonly<string>;
  url: Readonly<string>;
  body: Readonly<ErrorResponseSchemaType>;

  constructor(init: {
    headers: Headers;
    status: number;
    statusText: string;
    url: string;
    body: ErrorResponseSchemaType;
  }) {
    super(init.body.message);
    this.name = 'ApiError';
    this.headers = init.headers;
    this.status = init.status;
    this.statusText = init.statusText;
    this.url = init.url;
    this.body = init.body;
  }
}
