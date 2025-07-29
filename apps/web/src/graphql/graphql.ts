/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Articles = {
  __typename?: 'Articles';
  body: Scalars['String']['output'];
  comments: Array<Comment>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tags: Array<Tags>;
  title: Scalars['String']['output'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['ID']['output'];
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type CommentDeleteResult = {
  __typename?: 'CommentDeleteResult';
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  create: Tags;
  createArticle: Articles;
  createComment: Comment;
  deleteArticle: Articles;
  followUser: Scalars['Boolean']['output'];
  register: User;
  removeComment: CommentDeleteResult;
  unFollowUser: Scalars['Boolean']['output'];
  updateArticle: Articles;
  updateUser: User;
};


export type MutationCreateArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateArticleArgs = {
  body: Scalars['String']['input'];
  description: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};


export type MutationCreateCommentArgs = {
  body: Scalars['String']['input'];
  postId: Scalars['ID']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String']['input'];
};


export type MutationFollowUserArgs = {
  followingId: Scalars['ID']['input'];
};


export type MutationRegisterArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRemoveCommentArgs = {
  commentId: Scalars['ID']['input'];
};


export type MutationUnFollowUserArgs = {
  followingId: Scalars['ID']['input'];
};


export type MutationUpdateArticleArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateUserArgs = {
  bio?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
};

export type ProfileUser = {
  __typename?: 'ProfileUser';
  bio: Scalars['String']['output'];
  email: Scalars['String']['output'];
  following?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  articleById: Articles;
  articles: Array<Articles>;
  getCommentsByArticleId: Array<Comment>;
  getUser: ProfileUser;
  login: UserLogin;
  tags: Array<Tags>;
  whoAmI: User;
};


export type QueryArticleByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCommentsByArticleIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetUserArgs = {
  username: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Tags = {
  __typename?: 'Tags';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type User = {
  __typename?: 'User';
  bio: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type UserLogin = {
  __typename?: 'UserLogin';
  bio: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type LoginQueryVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'UserLogin', id: string, username: string, email: string, bio: string, image?: string | null, token: string } };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String']['input'];
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: string, username: string, email: string, bio: string, image?: string | null } };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoAmI: { __typename?: 'User', id: string, username: string, email: string, bio: string, image?: string | null } };

export type ArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type ArticlesQuery = { __typename?: 'Query', articles: Array<{ __typename?: 'Articles', id: string, title: string, description: string, body: string }> };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const LoginDocument = new TypedDocumentString(`
    query Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    id
    username
    email
    bio
    image
    token
  }
}
    `) as unknown as TypedDocumentString<LoginQuery, LoginQueryVariables>;
export const RegisterDocument = new TypedDocumentString(`
    mutation Register($username: String!, $email: String!, $password: String!) {
  register(username: $username, email: $email, password: $password) {
    id
    username
    email
    bio
    image
  }
}
    `) as unknown as TypedDocumentString<RegisterMutation, RegisterMutationVariables>;
export const WhoAmIDocument = new TypedDocumentString(`
    query WhoAmI {
  whoAmI {
    id
    username
    email
    bio
    image
  }
}
    `) as unknown as TypedDocumentString<WhoAmIQuery, WhoAmIQueryVariables>;
export const ArticlesDocument = new TypedDocumentString(`
    query articles {
  articles {
    id
    title
    description
    body
  }
}
    `) as unknown as TypedDocumentString<ArticlesQuery, ArticlesQueryVariables>;