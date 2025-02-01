import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL, RAPIDAPI_KEY, RAPIDAPI_HOST } from '../../utils/cardsBaseUrl';

export const houseApi = createApi({
  reducerPath: 'houseApi',
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
      query: ({ locationExternalIDs, purpose, hitsPerPage, page, lang }) => ({
        url: 'properties/list',
        params: {
          locationExternalIDs: locationExternalIDs || "5002,6020",
          purpose: purpose || "for-rent",
          hitsPerPage: hitsPerPage || 24,
          page: page || 0,
          lang: lang || "en",
        },
        keepUnusedDataFor: 60, 
        refetchOnMountOrArgChange: false,
        refetchOnReconnect: true,
      }),
    }),

  }),
});

export const { useGetAllHouseQuery } = houseApi;
