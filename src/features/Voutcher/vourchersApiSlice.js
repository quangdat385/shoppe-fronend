import { createEntityAdapter } from '@reduxjs/toolkit';


import { apiSlice } from '~/app/api/apiSlice';


const vourCherstAdapter = createEntityAdapter({});

const initialState = vourCherstAdapter.getInitialState();



export const userCartApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    //get api/usercart
    getVourChers: builder.query({
      query: (type) => ({
        url: `/vourcher?type=${type}`,
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: responseData => {
        const vourchers = responseData.map(item => {
          item.id = item._id
          return item
        });

        return vourCherstAdapter.setAll(initialState, vourchers);
      },
      providesTags: (result, error, arg) => {

        if (result?.ids) {
          return [
            { type: 'Cart', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Vourchers', id })),
          ]
        } else return [{ type: 'Vourchers', id: 'LIST' }]
      },
    }),
  })
})

export const {
  useGetVourChersQuery,

} = userCartApiSlice