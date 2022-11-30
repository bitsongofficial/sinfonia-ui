/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Cursor: any;
  JSON: any;
  ObjectID: any;
  Time: any;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
  startCursor?: Maybe<Scalars['String']>;
};

export type PaginationParam = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Podcast = {
  __typename?: 'Podcast';
  _id: Scalars['ObjectID'];
  author?: Maybe<Scalars['String']>;
  categories?: Maybe<Array<Maybe<Scalars['String']>>>;
  copyright?: Maybe<Scalars['String']>;
  created_at?: Maybe<Scalars['Time']>;
  description?: Maybe<Scalars['String']>;
  explicit?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  language?: Maybe<Scalars['String']>;
  last_parsed_at?: Maybe<Scalars['Time']>;
  link?: Maybe<Scalars['String']>;
  original_feed_url?: Maybe<Scalars['String']>;
  owner?: Maybe<PodcastOwner>;
  status?: Maybe<Scalars['String']>;
  status_code?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  updated_at?: Maybe<Scalars['Time']>;
};

export type PodcastConnection = {
  __typename?: 'PodcastConnection';
  edges?: Maybe<Array<Maybe<PodcastEdge>>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PodcastEdge = {
  __typename?: 'PodcastEdge';
  cursor: Scalars['Cursor'];
  node?: Maybe<Podcast>;
};

export type PodcastEpisode = {
  __typename?: 'PodcastEpisode';
  _id: Scalars['ObjectID'];
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['String']>;
  enclosures?: Maybe<Array<Maybe<PodcastEpisodeEnclosure>>>;
  episode?: Maybe<Scalars['String']>;
  episode_type?: Maybe<Scalars['String']>;
  guid?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  link?: Maybe<Scalars['String']>;
  podcast_id: Scalars['ObjectID'];
  pub_date?: Maybe<Scalars['Time']>;
  season?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type PodcastEpisodeEnclosure = {
  __typename?: 'PodcastEpisodeEnclosure';
  length?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type PodcastOwner = {
  __typename?: 'PodcastOwner';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type PodcastWhere = {
  category?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ObjectID']>;
  language?: InputMaybe<Scalars['String']>;
};

export type PodcastWhereUnique = {
  id: Scalars['ObjectID'];
};

export type Query = {
  __typename?: 'Query';
  /**  Get Podcast by ID */
  podcast?: Maybe<Podcast>;
  /**  Get Podcast Episode by ID */
  podcastEpisode?: Maybe<PodcastEpisode>;
  /** Get Podcast Episodes */
  podcastEpisodes?: Maybe<Array<Maybe<PodcastEpisode>>>;
  /** Get Podcasts */
  podcasts: PodcastConnection;
};


export type QueryPodcastArgs = {
  id: Scalars['ObjectID'];
};


export type QueryPodcastEpisodeArgs = {
  id: Scalars['ObjectID'];
};


export type QueryPodcastEpisodesArgs = {
  podcast_id: Scalars['ObjectID'];
};


export type QueryPodcastsArgs = {
  pagination?: InputMaybe<PaginationParam>;
};

export type PodcastsPaginatedQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
}>;


export type PodcastsPaginatedQuery = { __typename?: 'Query', podcasts: { __typename?: 'PodcastConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage?: boolean | null, hasNextPage?: boolean | null }, edges?: Array<{ __typename?: 'PodcastEdge', cursor: any, node?: { __typename?: 'Podcast', _id: any, title?: string | null, description?: string | null, original_feed_url?: string | null, link?: string | null, image?: string | null, author?: string | null, copyright?: string | null, language?: string | null, type?: string | null, explicit?: string | null, status_code?: number | null, status?: string | null, created_at?: any | null, updated_at?: any | null, last_parsed_at?: any | null } | null } | null> | null } };

export type PodcastEpisodesQueryVariables = Exact<{
  podcast_id: Scalars['ObjectID'];
}>;


export type PodcastEpisodesQuery = { __typename?: 'Query', podcastEpisodes?: Array<{ __typename?: 'PodcastEpisode', _id: any, title?: string | null, description?: string | null, image?: string | null, enclosures?: Array<{ __typename?: 'PodcastEpisodeEnclosure', url?: string | null, type?: string | null, length?: string | null } | null> | null } | null> | null };

export type PodcastQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;


export type PodcastQuery = { __typename?: 'Query', podcast?: { __typename?: 'Podcast', _id: any, title?: string | null, description?: string | null, image?: string | null, author?: string | null } | null };

export type PodcastWithEpisodesQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;


export type PodcastWithEpisodesQuery = { __typename?: 'Query', podcast?: { __typename?: 'Podcast', _id: any, title?: string | null, description?: string | null, image?: string | null, author?: string | null } | null, podcastEpisodes?: Array<{ __typename?: 'PodcastEpisode', _id: any, title?: string | null, description?: string | null, image?: string | null, podcast_id: any, enclosures?: Array<{ __typename?: 'PodcastEpisodeEnclosure', url?: string | null, type?: string | null, length?: string | null } | null> | null } | null> | null };


export const PodcastsPaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PodcastsPaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcasts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"original_feed_url"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"copyright"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"explicit"}},{"kind":"Field","name":{"kind":"Name","value":"status_code"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"last_parsed_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PodcastsPaginatedQuery, PodcastsPaginatedQueryVariables>;
export const PodcastEpisodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcastEpisodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"podcast_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcastEpisodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"podcast_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"podcast_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"enclosures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]}}]} as unknown as DocumentNode<PodcastEpisodesQuery, PodcastEpisodesQueryVariables>;
export const PodcastDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcast"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcast"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}}]}}]} as unknown as DocumentNode<PodcastQuery, PodcastQueryVariables>;
export const PodcastWithEpisodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcastWithEpisodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcast"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}},{"kind":"Field","name":{"kind":"Name","value":"podcastEpisodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"podcast_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"podcast_id"}},{"kind":"Field","name":{"kind":"Name","value":"enclosures"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}}]}}]}}]} as unknown as DocumentNode<PodcastWithEpisodesQuery, PodcastWithEpisodesQueryVariables>;