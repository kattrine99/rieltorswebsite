import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {GetUserByIdResponse, LoginUserPayload, LoginUserResponse, RegistrationUserPayload, RegistrationUserResponse } from "./types"
import { baseUrl } from "../../utils/baseUrl";

export const AuthApi = createApi({
    reducerPath: 'AuthApi',
    baseQuery: fetchBaseQuery({ baseUrl}),
    endpoints: (builder) => ({
        getUserById: builder.query<GetUserByIdResponse, number>({
            query: (user_id) => `/user?user_id=${user_id}`,
        }),
        LoginUser: builder.mutation<LoginUserResponse ,LoginUserPayload >({
            query: (payload) => ({
                url:'/login',
                method: "POST",
                body: payload,
            }),
        }),
        RegistrationUser: builder.mutation<RegistrationUserResponse, RegistrationUserPayload >({
            query: (payload) => ({
                url:'/registration',
                method: "POST",
                body: payload,
            }),
        }),
    }),
})

export const { useGetUserByIdQuery, 
               useLoginUserMutation, 
               useRegistrationUserMutation} = AuthApi