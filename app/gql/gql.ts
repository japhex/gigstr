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
    "\n  query gigs($past: Boolean) {\n    gigs(past: $past) {\n      id\n      artist\n      date\n      info\n      venue\n      lineup\n      festival\n    }\n  }\n": types.GigsDocument,
    "\n  mutation createGig(\n    $id: String!\n    $artist: JSONObject\n    $date: JSONObject\n    $info: String\n    $venue: JSONObject\n    $lineup: [JSONObject]\n    $festival: JSONObject\n  ) {\n    createGig(id: $id, artist: $artist, date: $date, info: $info, venue: $venue, lineup: $lineup, festival: $festival) {\n      id\n      artist\n      date\n      info\n      venue\n      lineup\n      festival\n    }\n  }\n": types.CreateGigDocument,
    "\n  mutation deleteGig($id: ID!) {\n    deleteGig(id: $id) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n": types.DeleteGigDocument,
    "\n  query searchGig($artist: String!, $date: String) {\n    searchGig(artist: $artist, date: $date)\n  }\n": types.SearchGigDocument,
    "\n  query gigsFestivalFilter {\n    gigsFestivalFilter {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n": types.GigsFestivalFilterDocument,
    "\n  query gigsMonthFilter($month: Int!) {\n    gigsMonthFilter(month: $month) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n": types.GigsMonthFilterDocument,
    "\n  query gigsYearFilter($year: Int!) {\n    gigsYearFilter(year: $year) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n": types.GigsYearFilterDocument,
    "\n  query gigsUnfiltered {\n    gigsUnfiltered {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n": types.GigsUnfilteredDocument,
    "\n  mutation rateGig($id: ID!, $rating: Int!) {\n    rateGig(id: $id, rating: $rating)\n  }\n": types.RateGigDocument,
};

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

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gigs($past: Boolean) {\n    gigs(past: $past) {\n      id\n      artist\n      date\n      info\n      venue\n      lineup\n      festival\n    }\n  }\n"): (typeof documents)["\n  query gigs($past: Boolean) {\n    gigs(past: $past) {\n      id\n      artist\n      date\n      info\n      venue\n      lineup\n      festival\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createGig(\n    $id: String!\n    $artist: JSONObject\n    $date: JSONObject\n    $info: String\n    $venue: JSONObject\n    $lineup: [JSONObject]\n    $festival: JSONObject\n  ) {\n    createGig(id: $id, artist: $artist, date: $date, info: $info, venue: $venue, lineup: $lineup, festival: $festival) {\n      id\n      artist\n      date\n      info\n      venue\n      lineup\n      festival\n    }\n  }\n"): (typeof documents)["\n  mutation createGig(\n    $id: String!\n    $artist: JSONObject\n    $date: JSONObject\n    $info: String\n    $venue: JSONObject\n    $lineup: [JSONObject]\n    $festival: JSONObject\n  ) {\n    createGig(id: $id, artist: $artist, date: $date, info: $info, venue: $venue, lineup: $lineup, festival: $festival) {\n      id\n      artist\n      date\n      info\n      venue\n      lineup\n      festival\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteGig($id: ID!) {\n    deleteGig(id: $id) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"): (typeof documents)["\n  mutation deleteGig($id: ID!) {\n    deleteGig(id: $id) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchGig($artist: String!, $date: String) {\n    searchGig(artist: $artist, date: $date)\n  }\n"): (typeof documents)["\n  query searchGig($artist: String!, $date: String) {\n    searchGig(artist: $artist, date: $date)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gigsFestivalFilter {\n    gigsFestivalFilter {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"): (typeof documents)["\n  query gigsFestivalFilter {\n    gigsFestivalFilter {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gigsMonthFilter($month: Int!) {\n    gigsMonthFilter(month: $month) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"): (typeof documents)["\n  query gigsMonthFilter($month: Int!) {\n    gigsMonthFilter(month: $month) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gigsYearFilter($year: Int!) {\n    gigsYearFilter(year: $year) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"): (typeof documents)["\n  query gigsYearFilter($year: Int!) {\n    gigsYearFilter(year: $year) {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gigsUnfiltered {\n    gigsUnfiltered {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"): (typeof documents)["\n  query gigsUnfiltered {\n    gigsUnfiltered {\n      id\n      artist\n      date\n      venue\n      lineup\n      festival\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation rateGig($id: ID!, $rating: Int!) {\n    rateGig(id: $id, rating: $rating)\n  }\n"): (typeof documents)["\n  mutation rateGig($id: ID!, $rating: Int!) {\n    rateGig(id: $id, rating: $rating)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;