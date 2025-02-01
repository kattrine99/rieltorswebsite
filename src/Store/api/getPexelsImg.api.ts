import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { imageUrl, imgApiKey } from "../../utils/pexelsPhotoUrl"
export const pexelsApi = createApi({
    reducerPath: "pexelsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: imageUrl,
        prepareHeaders: (headers) => {
            headers.set("Authorization", imgApiKey);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getPexelsImages: builder.query({
            query: (query = "modern apartment interior") => ({
                url: "/search",
                params: {
                    query,
                    per_page: 6,
                    orientation: "landscape",
                },
            }),
        }),

    }),
});

export const { useGetPexelsImagesQuery } = pexelsApi;