import { request, RequestOptions, Variables } from "graphql-request";
import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

export function useGraphQL<TResult, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  variables: TVariables,
  requestHeaders?: RequestOptions["requestHeaders"]
): UseQueryResult<TResult> {
  return useQuery({
    queryKey: [document, variables],
    queryFn: async () =>
      request(
        "/graphql",
        document,
        // variables are type-checked too!
        variables as Variables,
        requestHeaders
      )
  });
}

export const NO_SERVER_CACHE_HEADER = { ["no-server-cache"]: "true" };
