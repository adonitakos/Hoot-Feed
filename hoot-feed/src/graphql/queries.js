/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHoot = /* GraphQL */ `
  query GetHoot($id: ID!) {
    getHoot(id: $id) {
      id
      message
      picture
      preferredUsername
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listHoots = /* GraphQL */ `
  query ListHoots(
    $filter: ModelHootFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHoots(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        message
        picture
        preferredUsername
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
