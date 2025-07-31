import { isServer } from "@tanstack/react-query";
import type { TypedDocumentString } from "./graphql";

type ErrorResponseGql = {
  errors: {
    message: string;
    locations?: { line: number; column: number }[];
    path?: (string | number)[];
  }[];
  data: null;
};

export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  let authorization = "";

  if (isServer) {
    const cookies = await import ('next/headers').then(mod => mod.cookies);
    const cookieStore = await cookies();
    authorization = `Bearer ${cookieStore.get("jwt-token")?.value}`;
  }

  const response = await fetch(isServer ? "http://localhost:4000/graphql" : "/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/graphql-response+json",
      Authorization: authorization,
    },
    credentials: "include",
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();

  if ((data as any).errors) {
    return [null, (data as ErrorResponseGql).errors] as const;
  }
  return [data.data as TResult, null] as const;
}
