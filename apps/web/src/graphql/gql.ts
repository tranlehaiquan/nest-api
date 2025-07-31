/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      username\n      email\n      bio\n      image\n      token\n    }\n  }\n": typeof types.LoginDocument,
    "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      id\n      username\n      email\n      bio\n      image\n    }\n  }\n": typeof types.RegisterDocument,
    "\n  query articles {\n    articles {\n      id\n      title\n      description\n      body\n    }\n  }\n": typeof types.ArticlesDocument,
    "\n  query WhoAmI {\n    whoAmI {\n      id\n      username\n      email\n      bio\n      image\n    }\n  }\n": typeof types.WhoAmIDocument,
};
const documents: Documents = {
    "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      username\n      email\n      bio\n      image\n      token\n    }\n  }\n": types.LoginDocument,
    "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      id\n      username\n      email\n      bio\n      image\n    }\n  }\n": types.RegisterDocument,
    "\n  query articles {\n    articles {\n      id\n      title\n      description\n      body\n    }\n  }\n": types.ArticlesDocument,
    "\n  query WhoAmI {\n    whoAmI {\n      id\n      username\n      email\n      bio\n      image\n    }\n  }\n": types.WhoAmIDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      id\n      username\n      email\n      bio\n      image\n      token\n    }\n  }\n"): typeof import('./graphql').LoginDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Register($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      id\n      username\n      email\n      bio\n      image\n    }\n  }\n"): typeof import('./graphql').RegisterDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query articles {\n    articles {\n      id\n      title\n      description\n      body\n    }\n  }\n"): typeof import('./graphql').ArticlesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query WhoAmI {\n    whoAmI {\n      id\n      username\n      email\n      bio\n      image\n    }\n  }\n"): typeof import('./graphql').WhoAmIDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
