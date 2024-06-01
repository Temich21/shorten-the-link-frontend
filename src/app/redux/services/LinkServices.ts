import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ServerURL, storageName } from '@app/constants/constants'

const dynamicBaseQuery = fetchBaseQuery({
    baseUrl: `${ServerURL}api/link`,
    prepareHeaders: (headers) => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data.token.token) {
            headers.set('authorization', `Bearer ${data.token.token}`);
        }
        return headers;
    },
})

export const linkAPI = createApi({
    reducerPath: "linkAPI",
    baseQuery: dynamicBaseQuery,
    tagTypes: ['Link'],
    endpoints: (builder) => ({
        getLinks: builder.query({
            query: () => '',
            providesTags: ['Link']
        }),
        getLink: builder.query({
            query: (id) => ({
                url: `${id}`,
                method: 'GET',
            }),
            providesTags: ['Link']
        }),
        createLink: builder.mutation({
            query: (link) => ({
                url: `generate`,
                method: 'POST',
                body: link,
            }),
            invalidatesTags: ['Link'],
        }),
        deleteLink: builder.mutation({
            query: (id) => ({
                url: `${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Link']
        })
    }),
})

export const { useGetLinksQuery, useGetLinkQuery, useCreateLinkMutation, useDeleteLinkMutation } = linkAPI