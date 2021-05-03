/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHOSPITAL = /* GraphQL */ `
  mutation CreateHOSPITAL(
    $input: CreateHOSPITALInput!
    $condition: ModelHOSPITALConditionInput
  ) {
    createHOSPITAL(input: $input, condition: $condition) {
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
export const updateHOSPITAL = /* GraphQL */ `
  mutation UpdateHOSPITAL(
    $input: UpdateHOSPITALInput!
    $condition: ModelHOSPITALConditionInput
  ) {
    updateHOSPITAL(input: $input, condition: $condition) {
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
export const deleteHOSPITAL = /* GraphQL */ `
  mutation DeleteHOSPITAL(
    $input: DeleteHOSPITALInput!
    $condition: ModelHOSPITALConditionInput
  ) {
    deleteHOSPITAL(input: $input, condition: $condition) {
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
