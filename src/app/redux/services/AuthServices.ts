import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ServerURL } from '@app/constants/constants'

export interface User {
    _id?: string
    email: string
    password: string
}

export const authAPI = createApi({
    reducerPath: "authAPI",
    baseQuery: fetchBaseQuery({
        baseUrl:  `${ServerURL}api/auth`,
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        getUser: builder.mutation({
            query: (user) => ({
                url: `register`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Auth'],
        }),
        createUser: builder.mutation({
            query: (user) => ({
                url: `login`,
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
})

export const { useGetUserMutation, useCreateUserMutation } = authAPI