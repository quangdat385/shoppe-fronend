import { createEntityAdapter } from '@reduxjs/toolkit';


import { apiSlice } from '~/app/api/apiSlice';


const userCartAdapter = createEntityAdapter({});

const initialState = userCartAdapter.getInitialState();



export const userCartApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //get api/product
        getDetails: builder.query({
            query: () => ({
                url: "/product/details",
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



    })
})

export const {
    useGetDetailsQuery
} = userCartApiSlice