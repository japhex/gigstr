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
  Date: any;
  JSONObject: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Gig = {
  __typename?: 'Gig';
  artist?: Maybe<Scalars['JSONObject']>;
  date?: Maybe<Scalars['JSONObject']>;
  festival?: Maybe<Scalars['JSONObject']>;
  id: Scalars['ID'];
  info?: Maybe<Scalars['String']>;
  lineup?: Maybe<Array<Maybe<Scalars['JSONObject']>>>;
  ticketmasterId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['JSONObject']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createGig: Gig;
  deleteGig?: Maybe<Array<Maybe<Gig>>>;
  login?: Maybe<Scalars['String']>;
  rateGig?: Maybe<Scalars['Int']>;
  signup?: Maybe<Scalars['String']>;
};


export type MutationCreateGigArgs = {
  artist?: InputMaybe<Scalars['JSONObject']>;
  date?: InputMaybe<Scalars['JSONObject']>;
  festival?: InputMaybe<Scalars['JSONObject']>;
  id: Scalars['String'];
  info?: InputMaybe<Scalars['String']>;
  lineup?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']>>>;
  ticketmasterId: Scalars['String'];
  venue?: InputMaybe<Scalars['JSONObject']>;
};


export type MutationDeleteGigArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRateGigArgs = {
  id: Scalars['ID'];
  rating: Scalars['Int'];
};


export type MutationSignupArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  gig?: Maybe<Gig>;
  gigs?: Maybe<Array<Maybe<Gig>>>;
  gigsFestivalFilter?: Maybe<Array<Maybe<Gig>>>;
  gigsMonthFilter?: Maybe<Array<Maybe<Gig>>>;
  gigsUnfiltered?: Maybe<Array<Maybe<Gig>>>;
  gigsYearFilter?: Maybe<Array<Maybe<Gig>>>;
  loggedInUser?: Maybe<User>;
  searchGig?: Maybe<Scalars['JSONObject']>;
  searchUsers?: Maybe<Array<Maybe<User>>>;
  user?: Maybe<UserWithGigs>;
  userGigs?: Maybe<UserWithGigs>;
  users: Array<User>;
};


export type QueryGigArgs = {
  id: Scalars['ID'];
};


export type QueryGigsArgs = {
  past?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGigsMonthFilterArgs = {
  month: Scalars['Int'];
};


export type QueryGigsYearFilterArgs = {
  year: Scalars['Int'];
};


export type QuerySearchGigArgs = {
  artist: Scalars['String'];
  date?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};


export type QuerySearchUsersArgs = {
  username: Scalars['String'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryUserGigsArgs = {
  userId: Scalars['ID'];
};

export type User = {
  __typename?: 'User';
  gigs: Array<Gig>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type UserWithGigs = {
  __typename?: 'UserWithGigs';
  gigs?: Maybe<Array<Maybe<Gig>>>;
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type GigsQueryVariables = Exact<{
  past?: InputMaybe<Scalars['Boolean']>;
}>;


export type GigsQuery = { __typename?: 'Query', gigs?: Array<{ __typename?: 'Gig', id: string, artist?: any | null, date?: any | null, info?: string | null, venue?: any | null, lineup?: Array<any | null> | null, festival?: any | null } | null> | null };

export type CreateGigMutationVariables = Exact<{
  id: Scalars['String'];
  ticketmasterId: Scalars['String'];
  artist?: InputMaybe<Scalars['JSONObject']>;
  date?: InputMaybe<Scalars['JSONObject']>;
  info?: InputMaybe<Scalars['String']>;
  venue?: InputMaybe<Scalars['JSONObject']>;
  lineup?: InputMaybe<Array<InputMaybe<Scalars['JSONObject']>> | InputMaybe<Scalars['JSONObject']>>;
  festival?: InputMaybe<Scalars['JSONObject']>;
}>;


export type CreateGigMutation = { __typename?: 'Mutation', createGig: { __typename?: 'Gig', id: string, artist?: any | null, date?: any | null, info?: string | null, venue?: any | null, lineup?: Array<any | null> | null, festival?: any | null } };

export type DeleteGigMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteGigMutation = { __typename?: 'Mutation', deleteGig?: Array<{ __typename?: 'Gig', id: string, artist?: any | null, date?: any | null, venue?: any | null, lineup?: Array<any | null> | null, festival?: any | null } | null> | null };

export type SearchGigQueryVariables = Exact<{
  artist: Scalars['String'];
  date?: InputMaybe<Scalars['String']>;
}>;


export type SearchGigQuery = { __typename?: 'Query', searchGig?: any | null };

export type GigsFestivalFilterQueryVariables = Exact<{ [key: string]: never; }>;


export type GigsFestivalFilterQuery = { __typename?: 'Query', gigsFestivalFilter?: Array<{ __typename?: 'Gig', id: string, artist?: any | null, date?: any | null, venue?: any | null, lineup?: Array<any | null> | null, festival?: any | null } | null> | null };

export type GigsMonthFilterQueryVariables = Exact<{
  month: Scalars['Int'];
}>;


export type GigsMonthFilterQuery = { __typename?: 'Query', gigsMonthFilter?: Array<{ __typename?: 'Gig', id: string, artist?: any | null, date?: any | null, venue?: any | null, lineup?: Array<any | null> | null, festival?: any | null } | null> | null };

export type GigsYearFilterQueryVariables = Exact<{
  year: Scalars['Int'];
}>;


export type GigsYearFilterQuery = { __typename?: 'Query', gigsYearFilter?: Array<{ __typename?: 'Gig', id: string, artist?: any | null, date?: any | null, venue?: any | null, lineup?: Array<any | null> | null, festival?: any | null } | null> | null };

export type GigsUnfilteredQueryVariables = Exact<{ [key: string]: never; }>;


export type GigsUnfilteredQuery = { __typename?: 'Query', gigsUnfiltered?: Array<{ __typename?: 'Gig', id: string, artist?: any | null, date?: any | null, venue?: any | null, lineup?: Array<any | null> | null, festival?: any | null } | null> | null };

export type RateGigMutationVariables = Exact<{
  id: Scalars['ID'];
  rating: Scalars['Int'];
}>;


export type RateGigMutation = { __typename?: 'Mutation', rateGig?: number | null };


export const GigsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gigs"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"past"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gigs"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"past"},"value":{"kind":"Variable","name":{"kind":"Name","value":"past"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"lineup"}},{"kind":"Field","name":{"kind":"Name","value":"festival"}}]}}]}}]} as unknown as DocumentNode<GigsQuery, GigsQueryVariables>;
export const CreateGigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createGig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketmasterId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artist"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"info"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"venue"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lineup"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"festival"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"ticketmasterId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketmasterId"}}},{"kind":"Argument","name":{"kind":"Name","value":"artist"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artist"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"info"},"value":{"kind":"Variable","name":{"kind":"Name","value":"info"}}},{"kind":"Argument","name":{"kind":"Name","value":"venue"},"value":{"kind":"Variable","name":{"kind":"Name","value":"venue"}}},{"kind":"Argument","name":{"kind":"Name","value":"lineup"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lineup"}}},{"kind":"Argument","name":{"kind":"Name","value":"festival"},"value":{"kind":"Variable","name":{"kind":"Name","value":"festival"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"info"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"lineup"}},{"kind":"Field","name":{"kind":"Name","value":"festival"}}]}}]}}]} as unknown as DocumentNode<CreateGigMutation, CreateGigMutationVariables>;
export const DeleteGigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"deleteGig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteGig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"lineup"}},{"kind":"Field","name":{"kind":"Name","value":"festival"}}]}}]}}]} as unknown as DocumentNode<DeleteGigMutation, DeleteGigMutationVariables>;
export const SearchGigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchGig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"artist"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchGig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"artist"},"value":{"kind":"Variable","name":{"kind":"Name","value":"artist"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}}]}]}}]} as unknown as DocumentNode<SearchGigQuery, SearchGigQueryVariables>;
export const GigsFestivalFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gigsFestivalFilter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gigsFestivalFilter"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"lineup"}},{"kind":"Field","name":{"kind":"Name","value":"festival"}}]}}]}}]} as unknown as DocumentNode<GigsFestivalFilterQuery, GigsFestivalFilterQueryVariables>;
export const GigsMonthFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gigsMonthFilter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"month"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gigsMonthFilter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"month"},"value":{"kind":"Variable","name":{"kind":"Name","value":"month"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"lineup"}},{"kind":"Field","name":{"kind":"Name","value":"festival"}}]}}]}}]} as unknown as DocumentNode<GigsMonthFilterQuery, GigsMonthFilterQueryVariables>;
export const GigsYearFilterDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gigsYearFilter"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"year"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gigsYearFilter"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"year"},"value":{"kind":"Variable","name":{"kind":"Name","value":"year"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"lineup"}},{"kind":"Field","name":{"kind":"Name","value":"festival"}}]}}]}}]} as unknown as DocumentNode<GigsYearFilterQuery, GigsYearFilterQueryVariables>;
export const GigsUnfilteredDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"gigsUnfiltered"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gigsUnfiltered"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"artist"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"venue"}},{"kind":"Field","name":{"kind":"Name","value":"lineup"}},{"kind":"Field","name":{"kind":"Name","value":"festival"}}]}}]}}]} as unknown as DocumentNode<GigsUnfilteredQuery, GigsUnfilteredQueryVariables>;
export const RateGigDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"rateGig"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"rating"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rateGig"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"rating"},"value":{"kind":"Variable","name":{"kind":"Name","value":"rating"}}}]}]}}]} as unknown as DocumentNode<RateGigMutation, RateGigMutationVariables>;