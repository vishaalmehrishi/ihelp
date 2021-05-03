/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getHOSPITAL = /* GraphQL */ `
  query GetHOSPITAL($id: ID!) {
    getHOSPITAL(id: $id) {
      id
      name_english
      name_hindi
      total_beds
      available_beds
      isolation_beds
      oxygen_supported
      reserved_icu_hdu
      access
      district
      latitude
      longitude
      createdAt
      updatedAt
    }
  }
`;
export const listHOSPITALs = /* GraphQL */ `
  query ListHOSPITALs(
    $filter: ModelHOSPITALFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHOSPITALs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name_english
        name_hindi
        total_beds
        available_beds
        isolation_beds
        oxygen_supported
        reserved_icu_hdu
        access
        district
        latitude
        longitude
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
