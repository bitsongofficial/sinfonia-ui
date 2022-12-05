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
  edges: Array<Maybe<PodcastEdge>>;
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
  duration: Scalars['Int'];
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

export type PodcastEpisodeConnection = {
  __typename?: 'PodcastEpisodeConnection';
  edges: Array<Maybe<PodcastEpisodeEdge>>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PodcastEpisodeEdge = {
  __typename?: 'PodcastEpisodeEdge';
  cursor: Scalars['Cursor'];
  node?: Maybe<PodcastEpisode>;
};

export type PodcastEpisodeEnclosure = {
  __typename?: 'PodcastEpisodeEnclosure';
  length: Scalars['Int'];
  type: Scalars['String'];
  url: Scalars['String'];
};

export type PodcastExplore = {
  __typename?: 'PodcastExplore';
  elements: Array<Maybe<PodcastExploreElement>>;
};

export type PodcastExploreElement = {
  __typename?: 'PodcastExploreElement';
  hasMore: Scalars['String'];
  items: Array<Maybe<PodcastExploreElementItem>>;
  title: Scalars['String'];
  viewMode: PodcastExploreViewMode;
};

export type PodcastExploreElementItem = {
  __typename?: 'PodcastExploreElementItem';
  _id: Scalars['String'];
  image: Scalars['String'];
  link: Scalars['String'];
  subtitle: Scalars['String'];
  title: Scalars['String'];
};

export enum PodcastExploreViewMode {
  /** Podcast episodes style */
  CardLarge = 'CARD_LARGE',
  Circle = 'CIRCLE',
  Grid = 'GRID',
  Label = 'LABEL',
  List = 'LIST'
}

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
  /**  Get Podcast Episode Enclosure by ID */
  podcastEpisodeEnclosure?: Maybe<PodcastEpisodeEnclosure>;
  /** Get Podcast Episodes */
  podcastEpisodes: PodcastEpisodeConnection;
  /** Get a list of podcasts to explore */
  podcastExplore: PodcastExplore;
  /** Get a list of podcasts based on section query */
  podcastExploreSection: PodcastExplore;
  /** Get Podcasts */
  podcasts: PodcastConnection;
  /** Search Podcast Episode by term */
  searchPodcastEpisodes?: Maybe<SearchPodcastEpisodeResponse>;
  /** Search Podcast by term */
  searchPodcasts?: Maybe<SearchPodcastResponse>;
  /** Autocomplete Podcast by title */
  suggestPodcastTitles?: Maybe<SuggestResponse>;
};


export type QueryPodcastArgs = {
  id: Scalars['ObjectID'];
};


export type QueryPodcastEpisodeArgs = {
  id: Scalars['ObjectID'];
};


export type QueryPodcastEpisodeEnclosureArgs = {
  id: Scalars['ObjectID'];
};


export type QueryPodcastEpisodesArgs = {
  pagination?: InputMaybe<PaginationParam>;
  podcast_id: Scalars['ObjectID'];
};


export type QueryPodcastExploreSectionArgs = {
  section: Scalars['String'];
  start: Scalars['Int'];
};


export type QueryPodcastsArgs = {
  pagination?: InputMaybe<PaginationParam>;
};


export type QuerySearchPodcastEpisodesArgs = {
  start?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QuerySearchPodcastsArgs = {
  start?: InputMaybe<Scalars['Int']>;
  text: Scalars['String'];
};


export type QuerySuggestPodcastTitlesArgs = {
  text: Scalars['String'];
};

export type SearchPodcastDoc = {
  __typename?: 'SearchPodcastDoc';
  _id: Scalars['String'];
  author: Scalars['String'];
  image: Scalars['String'];
  title: Scalars['String'];
};

export type SearchPodcastEpisodeDoc = {
  __typename?: 'SearchPodcastEpisodeDoc';
  _id: Scalars['String'];
  description: Scalars['String'];
  duration: Scalars['String'];
  image: Scalars['String'];
  podcast_id: Scalars['String'];
  pub_date: Scalars['String'];
  title: Scalars['String'];
};

export type SearchPodcastEpisodeResponse = {
  __typename?: 'SearchPodcastEpisodeResponse';
  docs: Array<Maybe<SearchPodcastEpisodeDoc>>;
  numFound: Scalars['Int'];
  start: Scalars['Int'];
};

export type SearchPodcastResponse = {
  __typename?: 'SearchPodcastResponse';
  docs: Array<Maybe<SearchPodcastDoc>>;
  numFound: Scalars['Int'];
  start: Scalars['Int'];
};

export type Suggest = {
  __typename?: 'Suggest';
  term: Scalars['String'];
};

export type SuggestResponse = {
  __typename?: 'SuggestResponse';
  numFound: Scalars['Int'];
  suggestions?: Maybe<Array<Maybe<Suggest>>>;
};

export type PodcastsPaginatedQueryVariables = Exact<{
  first: Scalars['Int'];
  after: Scalars['String'];
  last: Scalars['Int'];
  before: Scalars['String'];
}>;


export type PodcastsPaginatedQuery = { __typename?: 'Query', podcasts: { __typename?: 'PodcastConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage?: boolean | null, hasNextPage?: boolean | null }, edges: Array<{ __typename?: 'PodcastEdge', cursor: any, node?: { __typename?: 'Podcast', _id: any, title?: string | null, description?: string | null, original_feed_url?: string | null, link?: string | null, image?: string | null, author?: string | null, copyright?: string | null, language?: string | null, type?: string | null, explicit?: string | null, status_code?: number | null, status?: string | null, created_at?: any | null, updated_at?: any | null, last_parsed_at?: any | null } | null } | null> } };

export type PodcastEpisodesQueryVariables = Exact<{
  podcast_id: Scalars['ObjectID'];
  first: Scalars['Int'];
  after: Scalars['String'];
  last: Scalars['Int'];
  before: Scalars['String'];
}>;


export type PodcastEpisodesQuery = { __typename?: 'Query', podcastEpisodes: { __typename?: 'PodcastEpisodeConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', startCursor?: string | null, endCursor?: string | null, hasPreviousPage?: boolean | null, hasNextPage?: boolean | null }, edges: Array<{ __typename?: 'PodcastEpisodeEdge', cursor: any, node?: { __typename?: 'PodcastEpisode', _id: any, title?: string | null, description?: string | null, image?: string | null, podcast_id: any, duration: number, pub_date?: any | null } | null } | null> } };

export type PodcastQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;


export type PodcastQuery = { __typename?: 'Query', podcast?: { __typename?: 'Podcast', _id: any, title?: string | null, description?: string | null, image?: string | null, author?: string | null } | null };

export type PodcastEpisodeQueryVariables = Exact<{
  id: Scalars['ObjectID'];
  podcast_id: Scalars['ObjectID'];
}>;


export type PodcastEpisodeQuery = { __typename?: 'Query', podcast?: { __typename?: 'Podcast', _id: any, title?: string | null, image?: string | null } | null, podcastEpisode?: { __typename?: 'PodcastEpisode', _id: any, title?: string | null, description?: string | null, image?: string | null, podcast_id: any, duration: number, pub_date?: any | null } | null };

export type SearchPodcastsQueryVariables = Exact<{
  text: Scalars['String'];
  start?: InputMaybe<Scalars['Int']>;
}>;


export type SearchPodcastsQuery = { __typename?: 'Query', searchPodcasts?: { __typename?: 'SearchPodcastResponse', numFound: number, start: number, docs: Array<{ __typename?: 'SearchPodcastDoc', _id: string, title: string, image: string, author: string } | null> } | null };

export type SearchPodcastEpisodesQueryVariables = Exact<{
  text: Scalars['String'];
  start?: InputMaybe<Scalars['Int']>;
}>;


export type SearchPodcastEpisodesQuery = { __typename?: 'Query', searchPodcastEpisodes?: { __typename?: 'SearchPodcastEpisodeResponse', numFound: number, start: number, docs: Array<{ __typename?: 'SearchPodcastEpisodeDoc', _id: string, title: string, image: string, description: string, duration: string, pub_date: string } | null> } | null };

export type SearchQueryVariables = Exact<{
  text: Scalars['String'];
  start?: InputMaybe<Scalars['Int']>;
}>;


export type SearchQuery = { __typename?: 'Query', searchPodcasts?: { __typename?: 'SearchPodcastResponse', numFound: number, start: number, docs: Array<{ __typename?: 'SearchPodcastDoc', _id: string, title: string, image: string, author: string } | null> } | null, searchPodcastEpisodes?: { __typename?: 'SearchPodcastEpisodeResponse', numFound: number, start: number, docs: Array<{ __typename?: 'SearchPodcastEpisodeDoc', _id: string, title: string, image: string, description: string, duration: string, podcast_id: string, pub_date: string } | null> } | null };

export type PodcastEpisodeEnclosureQueryVariables = Exact<{
  id: Scalars['ObjectID'];
}>;


export type PodcastEpisodeEnclosureQuery = { __typename?: 'Query', podcastEpisodeEnclosure?: { __typename?: 'PodcastEpisodeEnclosure', url: string, length: number, type: string } | null };

export type PodcastExploreQueryVariables = Exact<{ [key: string]: never; }>;


export type PodcastExploreQuery = { __typename?: 'Query', podcastExplore: { __typename?: 'PodcastExplore', elements: Array<{ __typename?: 'PodcastExploreElement', title: string, hasMore: string, viewMode: PodcastExploreViewMode, items: Array<{ __typename?: 'PodcastExploreElementItem', _id: string, image: string, title: string, subtitle: string, link: string } | null> } | null> } };

export type PodcastExploreSectionQueryVariables = Exact<{
  section: Scalars['String'];
  start: Scalars['Int'];
}>;


export type PodcastExploreSectionQuery = { __typename?: 'Query', podcastExploreSection: { __typename?: 'PodcastExplore', elements: Array<{ __typename?: 'PodcastExploreElement', title: string, hasMore: string, viewMode: PodcastExploreViewMode, items: Array<{ __typename?: 'PodcastExploreElementItem', _id: string, image: string, title: string, subtitle: string, link: string } | null> } | null> } };


export const PodcastsPaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PodcastsPaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcasts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"original_feed_url"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"copyright"}},{"kind":"Field","name":{"kind":"Name","value":"language"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"explicit"}},{"kind":"Field","name":{"kind":"Name","value":"status_code"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"updated_at"}},{"kind":"Field","name":{"kind":"Name","value":"last_parsed_at"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PodcastsPaginatedQuery, PodcastsPaginatedQueryVariables>;
export const PodcastEpisodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcastEpisodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"podcast_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcastEpisodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"podcast_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"podcast_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"podcast_id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"pub_date"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PodcastEpisodesQuery, PodcastEpisodesQueryVariables>;
export const PodcastDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcast"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcast"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}}]}}]} as unknown as DocumentNode<PodcastQuery, PodcastQueryVariables>;
export const PodcastEpisodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcastEpisode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"podcast_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcast"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"podcast_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}},{"kind":"Field","name":{"kind":"Name","value":"podcastEpisode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"podcast_id"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"pub_date"}}]}}]}}]} as unknown as DocumentNode<PodcastEpisodeQuery, PodcastEpisodeQueryVariables>;
export const SearchPodcastsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchPodcasts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchPodcasts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numFound"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}}]}}]}}]} as unknown as DocumentNode<SearchPodcastsQuery, SearchPodcastsQueryVariables>;
export const SearchPodcastEpisodesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchPodcastEpisodes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchPodcastEpisodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numFound"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"pub_date"}}]}}]}}]}}]} as unknown as DocumentNode<SearchPodcastEpisodesQuery, SearchPodcastEpisodesQueryVariables>;
export const SearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"search"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchPodcasts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numFound"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"author"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"searchPodcastEpisodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"numFound"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"docs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"podcast_id"}},{"kind":"Field","name":{"kind":"Name","value":"pub_date"}}]}}]}}]}}]} as unknown as DocumentNode<SearchQuery, SearchQueryVariables>;
export const PodcastEpisodeEnclosureDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcastEpisodeEnclosure"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ObjectID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcastEpisodeEnclosure"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}}]} as unknown as DocumentNode<PodcastEpisodeEnclosureQuery, PodcastEpisodeEnclosureQueryVariables>;
export const PodcastExploreDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcastExplore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcastExplore"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"viewMode"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PodcastExploreQuery, PodcastExploreQueryVariables>;
export const PodcastExploreSectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"podcastExploreSection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"section"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"podcastExploreSection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"section"},"value":{"kind":"Variable","name":{"kind":"Name","value":"section"}}},{"kind":"Argument","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"elements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"hasMore"}},{"kind":"Field","name":{"kind":"Name","value":"viewMode"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"subtitle"}},{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]}}]} as unknown as DocumentNode<PodcastExploreSectionQuery, PodcastExploreSectionQueryVariables>;