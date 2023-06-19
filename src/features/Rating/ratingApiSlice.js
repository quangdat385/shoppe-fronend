import { createEntityAdapter } from '@reduxjs/toolkit';


import { apiSlice } from '~/app/api/apiSlice';


const ratingAdapter = createEntityAdapter({});

const initialState = ratingAdapter.getInitialState();



export const ratingApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //get api/product
        getRating: builder.query({
            query: () => ({
                url: "/rating",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const rating = responseData.map(rate => {
                    rate.id = rate._id
                    return rate
                });

                return ratingAdapter.setAll(initialState, rating);
            },
            providesTags: (result, error, arg) => {

                if (result?.ids) {
                    return [
                        { type: 'Rate', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'rating', id })),
                    ]
                } else return [{ type: 'Rate', id: 'LIST' }]
            },



        }),
        updateRating: builder.mutation({
            query: initialproductData => ({
                url: '/rating/update',
                method: 'PATCH',
                body: {
                    ...initialproductData
                }
            }),
            invalidatesTags: [
                { type: 'Rate', id: 'LIST' }
            ]
        })


    })
})

export const {
    useGetRatingQuery,
    useUpdateRatingMutation
} = ratingApiSlice