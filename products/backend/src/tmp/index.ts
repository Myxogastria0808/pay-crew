import type { RouteConfig } from '@hono/zod-openapi';
import type { StatusCode } from 'hono/utils/http-status';

type ResponsesEntry = NonNullable<RouteConfig['responses']>[StatusCode];
type ResponsesConfig = Partial<Record<StatusCode, ResponsesEntry>>;
/** ユーザーが渡したマップ M に実在するステータスコードだけを抽出 */
type UserDefinedStatusCode<M extends ResponsesConfig> = Extract<StatusCode, keyof M>;

export class ZodOpenAPISchema<M extends ResponsesConfig> {
  private responses: Readonly<M>;
  constructor(responses: M) {
    this.responses = responses;
  }
  createSchema<R extends RouteConfig, T extends Readonly<UserDefinedStatusCode<M>[]>>(route: R, statusCodes?: T): R {
    if (statusCodes) {
      const extraResponses: ResponsesConfig = {};
      for (const statusCode of statusCodes) {
        const response = this.responses[statusCode];
        // Add only if the response is defined
        if (response) {
          extraResponses[statusCode] = response;
        }
      }

      return {
        ...route,
        responses: {
          ...extraResponses,
          ...route.responses,
        },
      } as R;
    }
    // If no status codes are provided, return the original route
    return route;
  }
}
