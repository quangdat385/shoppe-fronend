import { createEntityAdapter } from '@reduxjs/toolkit';


import { apiSlice } from '~/app/api/apiSlice';


const productDetailsAdapter = createEntityAdapter({});

const initialState = productDetailsAdapter.getInitialState();



export const productDetailsApiSlice = apiSlice.injectEndpoints({
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
                const details = responseData.map(details => {
                    details.id = details._id
                    return details
                });

                return productDetailsAdapter.setAll(initialState, details);
            },
            providesTags: (result, error, arg) => {

                if (result?.ids) {
                    return [
                        { type: 'Details', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'productDetails', id })),
                    ]
                } else return [{ type: 'Details', id: 'LIST' }]
            },



        }),



    })
})

export const {
    useGetDetailsQuery
} = productDetailsApiSlice