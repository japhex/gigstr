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
    "\n  query gigs($past: Boolean) {\n    gigs(past: $past) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n      ratings\n    }\n  }\n": types.GigsDocument,
    "\n  mutation createGig(\n    $id: String!\n    $ticketmasterId: String!\n    $artist: JSONObject\n    $date: JSONObject\n    $info: String\n    $venue: JSONObject\n    $lineup: [JSONObject]\n    $festival: JSONObject\n  ) {\n    createGig(\n      id: $id\n      ticketmasterId: $ticketmasterId\n      artist: $artist\n      date: $date\n      info: $info\n      venue: $venue\n      lineup: $lineup\n      festival: $festival\n    ) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n    }\n  }\n": types.CreateGigDocument,
    "\n  mutation deleteGig($id: ID!) {\n    deleteGig(id: $id)\n  }\n": types.DeleteGigDocument,
    "\n  query searchGig($artist: String!, $date: String) {\n    searchGig(artist: $artist, date: $date)\n  }\n": types.SearchGigDocument,
    "\n  query filterGigsByDate($month: String, $year: String) {\n    filterGigsByDate(month: $month, year: $year) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n    }\n  }\n": types.FilterGigsByDateDocument,
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
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query gigs($past: Boolean) {\n    gigs(past: $past) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n      ratings\n    }\n  }\n"): (typeof documents)["\n  query gigs($past: Boolean) {\n    gigs(past: $past) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n      ratings\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation createGig(\n    $id: String!\n    $ticketmasterId: String!\n    $artist: JSONObject\n    $date: JSONObject\n    $info: String\n    $venue: JSONObject\n    $lineup: [JSONObject]\n    $festival: JSONObject\n  ) {\n    createGig(\n      id: $id\n      ticketmasterId: $ticketmasterId\n      artist: $artist\n      date: $date\n      info: $info\n      venue: $venue\n      lineup: $lineup\n      festival: $festival\n    ) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation createGig(\n    $id: String!\n    $ticketmasterId: String!\n    $artist: JSONObject\n    $date: JSONObject\n    $info: String\n    $venue: JSONObject\n    $lineup: [JSONObject]\n    $festival: JSONObject\n  ) {\n    createGig(\n      id: $id\n      ticketmasterId: $ticketmasterId\n      artist: $artist\n      date: $date\n      info: $info\n      venue: $venue\n      lineup: $lineup\n      festival: $festival\n    ) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation deleteGig($id: ID!) {\n    deleteGig(id: $id)\n  }\n"): (typeof documents)["\n  mutation deleteGig($id: ID!) {\n    deleteGig(id: $id)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query searchGig($artist: String!, $date: String) {\n    searchGig(artist: $artist, date: $date)\n  }\n"): (typeof documents)["\n  query searchGig($artist: String!, $date: String) {\n    searchGig(artist: $artist, date: $date)\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query filterGigsByDate($month: String, $year: String) {\n    filterGigsByDate(month: $month, year: $year) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n    }\n  }\n"): (typeof documents)["\n  query filterGigsByDate($month: String, $year: String) {\n    filterGigsByDate(month: $month, year: $year) {\n      _id\n      artist {\n        name\n        image\n        genre\n        subGenre\n      }\n      date {\n        start\n        end\n      }\n      info\n      venue {\n        location\n        name\n        latitude\n        longitude\n        city\n        country\n      }\n      lineup {\n        name\n        image\n        genre\n        subGenre\n      }\n      festival {\n        start_date\n        end_date\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation rateGig($id: ID!, $rating: Int!) {\n    rateGig(id: $id, rating: $rating)\n  }\n"): (typeof documents)["\n  mutation rateGig($id: ID!, $rating: Int!) {\n    rateGig(id: $id, rating: $rating)\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;