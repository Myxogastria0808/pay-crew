import type { RouteConfig } from '@hono/zod-openapi';
import type { StatusCode } from 'hono/utils/http-status';

type ResponsesEntry = NonNullable<RouteConfig['responses']>[StatusCode];
type ResponsesConfig = Partial<Record<StatusCode, ResponsesEntry>>;
/** ユーザーが渡したマップ M に実在するステータスコードだけを抽出 */
type UserDefinedStatusCode<M extends ResponsesConfig> = Extract<StatusCode, keyof M>;

/** タプル T が重複を含んでいたら never、そうでなければ T をそのまま返す */
type UniqueTuple<
  Elm extends UserDefinedStatusCode<ResponsesConfig>,
  T extends Readonly<Elm[]>,
  Seen extends Readonly<Elm[]> = [],
> =
  T extends Readonly<[infer Head extends Elm, ...infer Tail extends Elm[]]>
    ? Head extends Seen[number]
      ? never
      : Readonly<[Head, ...UniqueTuple<Elm, Tail, [...Seen, Head]>]>
    : T;

export class ZodOpenAPISchema<M extends ResponsesConfig> {
  private responses: Readonly<M>;
  constructor(responses: M) {
    this.responses = responses;
  }

  createSchema<R extends RouteConfig, T extends Readonly<UserDefinedStatusCode<M>[]>>(
    route: R,
    statusCodes?: UniqueTuple<UserDefinedStatusCode<M>, T>
  ): R {
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
