import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Query {
    me: User!
    post(input: GetByIdInput!): Post!
    searchPosts(
      filters: SearchPostsFiltersInput!
      limit: Int!
      page: Int!
    ): SearchPostResponse!
    user(input: GetByIdInput!): User!
  }

  type Mutation {
    login(input: LoginInput!): LoginResponse!
  }

  interface MutationResponse {
    success: Boolean!
  }

  input GetByIdInput {
    id: Int!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type SearchPostResponse {
    limit: Int!
    page: Int!
    posts: [Post!]!
  }

  input SearchPostsFiltersInput {
    postType: PostType!
  }

  type LoginFailureResponse implements MutationResponse {
    success: Boolean!
    message: String!
  }

  type LoginSuccessResponse implements MutationResponse {
    success: Boolean!
    token: String!
  }

  union LoginResponse = LoginFailureResponse | LoginSuccessResponse

  enum PostType {
    news
    user
  }

  type Post {
    author: User
    authorId: Int!
    body: String!
    createdDate: String
    id: Int!
    lastLoveChangedDate: String
    lastNotesChangedDate: String
    modifiedDate: String
    name: String
    numLove: Int
    numNotes: Int
    parentId: Int!
    parentIds: [Int]!
    path: String
    publishedDate: String
    slug: String
    subsubtype: String
    subtype: String
    superparentId: Int!
    type: String
  }

  type User {
    avatarPath: String
    createdDate: String!
    id: Int!
    modifiedDate: String!
    name: String!
    numGames: Int!
    numPosts: Int!
    profilePath: String!
    type: String!
  }
`
