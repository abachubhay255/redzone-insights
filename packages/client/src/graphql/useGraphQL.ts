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
    queryFn: async () => request("/graphql", document, variables as Variables, requestHeaders),
    staleTime: 1000 * 60 * 5 // 5 minutes
  });
}

export const NO_SERVER_CACHE_HEADER = { ["no-server-cache"]: "true" };
