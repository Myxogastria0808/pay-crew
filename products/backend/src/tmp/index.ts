import type { RouteConfig } from '@hono/zod-openapi';
import type { StatusCode } from 'hono/utils/http-status';

type ResponsesEntry = NonNullable<RouteConfig['responses']>[StatusCode];
type ResponsesConfig = Partial<Record<StatusCode, ResponsesEntry>>;
/** ユーザーが渡したマップ M に実在するステータスコードだけを抽出 */
type UserDefinedStatusCode<M extends ResponsesConfig> = Extract<StatusCode, keyof M>;

/** 重複している要素を返す型 */
type DuplicateStatusCode<
  Elm extends UserDefinedStatusCode<ResponsesConfig>,
  Arr extends Readonly<Elm[]>,
  Seen extends Readonly<Elm[]> = [],
  Duplication extends Readonly<Elm[]> = [],
> =
  Arr extends Readonly<[infer Head extends Elm, ...infer Tail extends Elm[]]>
    ? Head extends Seen[number]
      ? DuplicateStatusCode<Elm, Tail, Seen, [...Duplication, Head]>
      : DuplicateStatusCode<Elm, Tail, [...Seen, Head], Duplication>
    : Duplication;

/** タプル Arr が重複を含んでいたら never、そうでなければ Arr をそのまま返す型 */
type UniqueTuple<
  Elm extends UserDefinedStatusCode<ResponsesConfig>,
  Arr extends Readonly<Elm[]>,
  Seen extends Readonly<Elm[]> = [],
> =
  Arr extends Readonly<[infer Head extends Elm, ...infer Tail extends Elm[]]>
    ? Head extends Seen[number]
      ? never
      : Readonly<[Head, ...UniqueTuple<Elm, Tail, [...Seen, Head]>]>
    : Arr;

/** never型のときは、独自型を返して型の不整合のエラーを表出させる型 */
type NeverWrapper<Elm extends UserDefinedStatusCode<ResponsesConfig>, T extends Readonly<Elm[]>> =
  UniqueTuple<Elm, T> extends never
    ? { error: 'Status codes must be unique.'; duplicate_status_codes: DuplicateStatusCode<Elm, T> }
    : UniqueTuple<Elm, T>;

export class ZodOpenAPISchema<M extends ResponsesConfig> {
  private responses: Readonly<M>;
  constructor(responses: M) {
    this.responses = responses;
  }

  // NOTE
  /*
    オプショナルな引数であることによって、never型のときにundefinedになって型の不整合のエラーを起こしていたのを
    オーバーロードで引数なしとありの2パターンを用意することで独自型が目的の型との型の不整合を起こさせることができ、
    その結果、型推論によって発生するエラーに独自型を表出させることができたっぽい。
  */
  // 引数なし
  createSchema<R extends RouteConfig>(route: R): R;
  // 引数あり
  createSchema<R extends RouteConfig, T extends Readonly<UserDefinedStatusCode<M>[]>>(
    route: R,
    statusCodes: NeverWrapper<UserDefinedStatusCode<M>, T>
  ): R;

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
