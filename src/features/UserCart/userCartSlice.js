import { createEntityAdapter } from '@reduxjs/toolkit';


import { apiSlice } from '~/app/api/apiSlice';


const userCartAdapter = createEntityAdapter({});

const initialState = userCartAdapter.getInitialState();



export const userCartApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //get api/usercart
    getUserPurchases: builder.query({
      query: (status) => ({
        url: `/usercart/user?status=${status}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: responseData => {
        const cart = responseData.map(cart => {
          cart.id = cart._id
          return cart
        });

        return userCartAdapter.setAll(initialState, cart);
      },
      providesTags: (result, error, arg) => {

        if (result?.ids) {
          return [
            { type: 'Cart', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'cart', id })),
          ]
        } else return [{ type: 'Cart', id: 'LIST' }]
      },



    }),
    purchaseProduct: builder.mutation({
      query: initial => ({
        url: '/usercart/purchase',
        method: 'POST',
        body: {
          ...initial
        }
      }),
      invalidatesTags: [
        { type: 'Cart', id: 'LIST' }
      ]
    }),
    updatePurchase: builder.mutation({
      query: (initial) => ({
        url: `/usercart/${initial.id}/update`,
        method: 'PATCH',
        body: { ...initial }
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }]
    }),
    updatePurchases: builder.mutation({
      query: (initial) => ({
        url: `/usercart/update-many`,
        method: 'PATCH',
        body: { ...initial }
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }]
    }),
    deleteOneOrder: builder.mutation({
      query: (id) => ({
        url: `/usercart/${id}/delete`,
        method: 'DELETE',
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }]
    }),
    deleteManyOrder: builder.mutation({
      query: (ids) => ({
        url: `/usercart/delete`,
        method: 'DELETE',
        body: { ...ids }
      }),

      invalidatesTags: (result, error, arg) => [{ type: 'Cart', id: arg.id }]
    }),

  })
})

export const {
  useGetUserPurchasesQuery,
  usePurchaseProductMutation,
  useUpdatePurchaseMutation,
  useUpdatePurchasesMutation,
  useDeleteOneOrderMutation,
  useDeleteManyOrderMutation
} = userCartApiSlice