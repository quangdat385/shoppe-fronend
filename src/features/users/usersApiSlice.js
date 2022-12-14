import { createEntityAdapter } from '@reduxjs/toolkit';

import { apiSlice } from '~/app/api/apiSlice';

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //get api/user
        getUsers: builder.query({
            query: () => ({
                url: '/user',
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
        //get user soft delete user/show/delete
        getSoftDeleteUsers: builder.mutation({
            query: () => ({
                url: '/user/show/delete',
                method: 'GET'
            })
        }),
        //ad new user user/create
        addNewUser: builder.mutation({
            query: initialUserData => ({
                url: '/user/create',
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
                url: '/user/update',
                method: 'PATCH',
                body: { ...initialUserData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        }),
        //update user 
        updateUser: builder.mutation({
            query: initialUserData => ({
                url: `/user/${initialUserData.id}/update`,
                method: 'PATCH',
                body: { ...initialUserData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        }),
        //update user method put user/:id/change/password
        changePassword: builder.mutation({
            query: initialUserData => ({
                url: `user/${initialUserData.id}/change/password`,
                method: 'PUT',
                body: { ...initialUserData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'User', id: arg.id }]
        }),
        //soft delete user method delete user/:id/soft/delete
        softDelete: builder.mutation({
            query: id => ({
                url: `user/${id}/soft/delete`,
                method: 'DELETE',

            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        //delete user method delete user/:id/delete
        deleteUser: builder.mutation({
            query: id => ({
                url: `user/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        //restore user method patch user/:id/restore
        restoreUser: builder.mutation({
            query: id => ({
                url: `user/${id}/restore`,
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        })
    })

})

export const {
    useGetUsersQuery,
    useGetSoftDeleteUsersMutation,
    useAddNewUserMutation,
    useUpdateManagerMutation,
    useUpdateUserMutation,
    useChangePasswordMutation,
    useSoftDeleteMutation,
    useDeleteUserMutation,
    useRestoreUserMutation
} = usersApiSlice