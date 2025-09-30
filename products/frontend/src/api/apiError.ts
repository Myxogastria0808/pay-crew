import type { ErrorResponseSchemaType } from 'paycrew-validator';

export class ApiError {
  headers: Readonly<Headers>;
  status: Readonly<number>;
  statusText: Readonly<string>;
  url: Readonly<string>;
  body: Readonly<ErrorResponseSchemaType>;
  message: Readonly<string>;

  constructor(init: {
    headers: Headers;
    status: number;
    statusText: string;
    url: string;
    body: ErrorResponseSchemaType;
  }) {
    this.headers = init.headers;
    this.status = init.status;
    this.statusText = init.statusText;
    this.url = init.url;
    this.body = init.body;
    this.message = init.body.message;
  }
}
