import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => `/users`
        }),
        getUser: builder.query({
            query: (id) => `/users/${id}`
        }),
        // deleteUser: builder.mutation({
        //     query: (id) => `/users/${id}`
        // })
    })
});

export const 
{ 
    useGetAllUsersQuery, 
    useGetUserQuery, 
    // useDeleteUserQuery 
} = apiSlice;