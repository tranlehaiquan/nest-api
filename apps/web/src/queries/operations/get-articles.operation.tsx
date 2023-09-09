import type * as Types from '../../graphql.types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ArticlesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ArticlesQuery = { __typename: 'Query', articles: Array<{ __typename: 'Articles', id: string, title: string }> };


export const ArticlesDocument = /*#__PURE__*/ gql`
    query articles {
  articles {
    id
    title
  }
}
    `;

/**
 * __useArticlesQuery__
 *
 * To run a query within a React component, call `useArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useArticlesQuery(baseOptions?: Apollo.QueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
      }
export function useArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ArticlesQuery, ArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ArticlesQuery, ArticlesQueryVariables>(ArticlesDocument, options);
        }
export type ArticlesQueryHookResult = ReturnType<typeof useArticlesQuery>;
export type ArticlesLazyQueryHookResult = ReturnType<typeof useArticlesLazyQuery>;
export type ArticlesQueryResult = Apollo.QueryResult<ArticlesQuery, ArticlesQueryVariables>;
export function refetchArticlesQuery(variables?: ArticlesQueryVariables) {
      return { query: ArticlesDocument, variables: variables }
    }