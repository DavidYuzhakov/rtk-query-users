import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser } from "../../models/models";

export const usersApi = createApi({
  reducerPath: 'users/api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000'
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    getUsers: builder.query<IUser[], number>({
      query: (limit) => ({
        url: 'users',
        params: {
          _limit: limit === 0 ? '' : limit
        }
      }),
      providesTags: () => ['User']
    }),
    createUser: builder.mutation<IUser, IUser>({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User']
    }),
    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User']
    }),
    updateUser: builder.mutation<IUser, IUser>({
      query: ({ id, ...user }) => ({
        url: `users/${id}`,
        method: 'PATCH',
        body: user
      }),
      invalidatesTags: ['User']
    })
  })
})

export const { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation, useUpdateUserMutation } = usersApi
