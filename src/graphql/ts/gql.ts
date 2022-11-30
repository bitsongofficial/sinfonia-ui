/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n\tquery PodcastsPaginated(\n\t\t$first: Int!\n\t\t$after: String!\n\t\t$last: Int!\n\t\t$before: String!\n\t) {\n\t\tpodcasts(\n\t\t\tpagination: { first: $first, after: $after, last: $last, before: $before }\n\t\t) {\n\t\t\ttotalCount\n\t\t\tpageInfo {\n\t\t\t\tstartCursor\n\t\t\t\tendCursor\n\t\t\t\thasPreviousPage\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t\tedges {\n\t\t\t\tcursor\n\t\t\t\tnode {\n\t\t\t\t\t_id\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\toriginal_feed_url\n\t\t\t\t\tlink\n\t\t\t\t\timage\n\t\t\t\t\tauthor\n\t\t\t\t\tcopyright\n\t\t\t\t\tlanguage\n\t\t\t\t\ttype\n\t\t\t\t\texplicit\n\t\t\t\t\tstatus_code\n\t\t\t\t\tstatus\n\t\t\t\t\tcreated_at\n\t\t\t\t\tupdated_at\n\t\t\t\t\tlast_parsed_at\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n": types.PodcastsPaginatedDocument,
    "\n\tquery podcastEpisodes($podcast_id: ObjectID!) {\n\t\tpodcastEpisodes(podcast_id: $podcast_id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n": types.PodcastEpisodesDocument,
    "\n\tquery podcast($id: ObjectID!) {\n\t\tpodcast(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tauthor\n\t\t}\n\t}\n": types.PodcastDocument,
    "\n\tquery podcastWithEpisodes($id: ObjectID!) {\n\t\tpodcast(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tauthor\n\t\t}\n\t\tpodcastEpisodes(podcast_id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tpodcast_id\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n": types.PodcastWithEpisodesDocument,
    "\n\tquery podcastEpisode($id: ObjectID!) {\n\t\tpodcastEpisode(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tpodcast_id\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n": types.PodcastEpisodeDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery PodcastsPaginated(\n\t\t$first: Int!\n\t\t$after: String!\n\t\t$last: Int!\n\t\t$before: String!\n\t) {\n\t\tpodcasts(\n\t\t\tpagination: { first: $first, after: $after, last: $last, before: $before }\n\t\t) {\n\t\t\ttotalCount\n\t\t\tpageInfo {\n\t\t\t\tstartCursor\n\t\t\t\tendCursor\n\t\t\t\thasPreviousPage\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t\tedges {\n\t\t\t\tcursor\n\t\t\t\tnode {\n\t\t\t\t\t_id\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\toriginal_feed_url\n\t\t\t\t\tlink\n\t\t\t\t\timage\n\t\t\t\t\tauthor\n\t\t\t\t\tcopyright\n\t\t\t\t\tlanguage\n\t\t\t\t\ttype\n\t\t\t\t\texplicit\n\t\t\t\t\tstatus_code\n\t\t\t\t\tstatus\n\t\t\t\t\tcreated_at\n\t\t\t\t\tupdated_at\n\t\t\t\t\tlast_parsed_at\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery PodcastsPaginated(\n\t\t$first: Int!\n\t\t$after: String!\n\t\t$last: Int!\n\t\t$before: String!\n\t) {\n\t\tpodcasts(\n\t\t\tpagination: { first: $first, after: $after, last: $last, before: $before }\n\t\t) {\n\t\t\ttotalCount\n\t\t\tpageInfo {\n\t\t\t\tstartCursor\n\t\t\t\tendCursor\n\t\t\t\thasPreviousPage\n\t\t\t\thasNextPage\n\t\t\t}\n\t\t\tedges {\n\t\t\t\tcursor\n\t\t\t\tnode {\n\t\t\t\t\t_id\n\t\t\t\t\ttitle\n\t\t\t\t\tdescription\n\t\t\t\t\toriginal_feed_url\n\t\t\t\t\tlink\n\t\t\t\t\timage\n\t\t\t\t\tauthor\n\t\t\t\t\tcopyright\n\t\t\t\t\tlanguage\n\t\t\t\t\ttype\n\t\t\t\t\texplicit\n\t\t\t\t\tstatus_code\n\t\t\t\t\tstatus\n\t\t\t\t\tcreated_at\n\t\t\t\t\tupdated_at\n\t\t\t\t\tlast_parsed_at\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery podcastEpisodes($podcast_id: ObjectID!) {\n\t\tpodcastEpisodes(podcast_id: $podcast_id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery podcastEpisodes($podcast_id: ObjectID!) {\n\t\tpodcastEpisodes(podcast_id: $podcast_id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery podcast($id: ObjectID!) {\n\t\tpodcast(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tauthor\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery podcast($id: ObjectID!) {\n\t\tpodcast(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tauthor\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery podcastWithEpisodes($id: ObjectID!) {\n\t\tpodcast(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tauthor\n\t\t}\n\t\tpodcastEpisodes(podcast_id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tpodcast_id\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery podcastWithEpisodes($id: ObjectID!) {\n\t\tpodcast(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tauthor\n\t\t}\n\t\tpodcastEpisodes(podcast_id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tpodcast_id\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n\tquery podcastEpisode($id: ObjectID!) {\n\t\tpodcastEpisode(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tpodcast_id\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery podcastEpisode($id: ObjectID!) {\n\t\tpodcastEpisode(id: $id) {\n\t\t\t_id\n\t\t\ttitle\n\t\t\tdescription\n\t\t\timage\n\t\t\tpodcast_id\n\t\t\tenclosures {\n\t\t\t\turl\n\t\t\t\ttype\n\t\t\t\tlength\n\t\t\t}\n\t\t}\n\t}\n"];

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function graphql(source: string): unknown;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;