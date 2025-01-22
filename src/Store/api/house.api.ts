import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, RAPIDAPI_KEY, RAPIDAPI_HOST } from '../../utils/cardsBaseUrl';

export const houseApi = createApi({
  reducerPath: 'houseApi', // Уникальный идентификатор для API
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', RAPIDAPI_KEY);
      headers.set('x-rapidapi-host', RAPIDAPI_HOST);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllHouse: builder.query({
      query: () => '/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=24',
    }),
    getHouseDetails: builder.query({
      query: (externalID: string) => `/properties/detail?externalID=${externalID}`,
    }),
  }),
});

export const { useGetAllHouseQuery, useGetHouseDetailsQuery } = houseApi;
