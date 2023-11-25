import { createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '~/app/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //get api/user
    getUsers: builder.query({
      query: ({ update = false }) => ({
        url: '/users',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: responseData => {

        const loadedUsers = responseData.map(user => {
          user.id = user._id
          return user
        });
        return usersAdapter.setAll(initialState, loadedUsers)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'User', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'User', id }))
          ]
        } else return [{ type: 'User', id: 'LIST' }]
      },




    }),
    getUser: builder.query({
      query: ({ id, update = false }) => ({
        url: `/users/${id}/profile`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }), providesTags: (result, error, id) => [{ type: 'User', id }]
    }),
    //get user soft delete user/show/delete
    getSoftDeleteUsers: builder.mutation({
      query: () => ({
        url: '/users/show/delete',
        method: 'GET'
      })
    }),
    //ad new user user/create
    addNewUser: builder.mutation({
      query: initialUserData => ({
        url: '/users/create',
        method: 'POST',
        body: {
          ...initialUserData
        }
      }),
      invalidatesTags: [
        { type: 'User', id: 'LIST' }
      ]
    }),
    //update Manager put user/update
    updateManager: builder.mutation({
      query: initialUserData => ({
        url: '/users/update',
        method: 'PATCH',
        body: { ...initialUserData }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    //update user 
    addAddress: builder.mutation({
      query: (initialUserData) => ({
        url: `/users/${initialUserData.id}/addAddress`,
        method: 'PATCH',
        body: { ...initialUserData }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    //delete address
    deleteAddress: builder.mutation({
      query: (initialUserData) => ({
        url: `/users/${initialUserData.id}/remove/address`,
        method: 'PATCH',
        body: { ...initialUserData }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: `/users/${initialUserData.id}/update`,
        method: 'PATCH',
        body: { ...initialUserData }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    updateAddress: builder.mutation({
      query: (initialUserData) => ({
        url: `/users/${initialUserData.id}/update/address`,
        method: 'PATCH',
        body: { ...initialUserData }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    updatePhoneNumber: builder.mutation({
      query: (initialUserData) => ({
        url: `/users/${initialUserData.id}/update/phone`,
        method: 'PATCH',
        body: { ...initialUserData }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    updateEmail: builder.mutation({
      query: (initialUserData) => ({
        url: `/users/${initialUserData.id}/update/email`,
        method: 'PATCH',
        body: { ...initialUserData }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    //update user method put user/:id/change/password
    changePassword: builder.mutation({
      query: initialUserData => ({
        url: `users/${initialUserData.id}/change/password`,
        method: 'PUT',
        body: { ...initialUserData }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
    }),
    //soft delete user method delete user/:id/soft/delete
    softDelete: builder.mutation({
      query: id => ({
        url: `users/${id}/soft/delete`,
        method: 'DELETE',

      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),
    //delete user method delete user/:id/delete
    deleteUser: builder.mutation({
      query: id => ({
        url: `users/${id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),
    //restore user method patch user/:id/restore
    restoreUser: builder.mutation({
      query: id => ({
        url: `users/${id}/restore`,
        method: 'PATCH'
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id }
      ]
    }),


  })

})

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useGetSoftDeleteUsersMutation,
  useAddNewUserMutation,
  useUpdateManagerMutation,
  useUpdateUserMutation,
  useChangePasswordMutation,
  useSoftDeleteMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useUpdatePhoneNumberMutation,
  useUpdateEmailMutation,
  useUpdateAddressMutation,
  useAddAddressMutation,
  useDeleteAddressMutation
} = usersApiSlice