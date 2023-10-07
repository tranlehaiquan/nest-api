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
  __typename: 'Articles';
  body: Scalars['String']['output'];
  comments: Array<Comment>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tags: Array<Tags>;
  title: Scalars['String']['output'];
};

export type Comment = {
  __typename: 'Comment';
  author: User;
  authorId: Scalars['ID']['output'];
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type CommentDeleteResult = {
  __typename: 'CommentDeleteResult';
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename: 'Mutation';
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
  tags: InputMaybe<Array<Scalars['String']['input']>>;
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
  bio: InputMaybe<Scalars['String']['input']>;
  email: InputMaybe<Scalars['String']['input']>;
  image: InputMaybe<Scalars['String']['input']>;
};

export type ProfileUser = {
  __typename: 'ProfileUser';
  bio: Scalars['String']['output'];
  email: Scalars['String']['output'];
  following: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Query = {
  __typename: 'Query';
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
  __typename: 'Tags';
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type User = {
  __typename: 'User';
  bio: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type UserLogin = {
  __typename: 'UserLogin';
  bio: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  token: Scalars['String']['output'];
  username: Scalars['String']['output'];
};
