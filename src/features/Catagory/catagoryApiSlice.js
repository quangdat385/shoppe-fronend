import { createEntityAdapter } from '@reduxjs/toolkit';


import { apiSlice } from '~/app/api/apiSlice';


const catagoryAdapter = createEntityAdapter({});

const initialState = catagoryAdapter.getInitialState();



export const catagoryApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //get api/product
        getCatagory: builder.query({
            query: () => ({
                url: "/catalo",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                const cata = responseData.map(cata => {
                    cata.id = cata._id
                    return cata
                });

                return catagoryAdapter.setAll(initialState, cata);
            },
            providesTags: (result, error, arg) => {

                if (result?.ids) {
                    return [
                        { type: 'Catagory', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'catagory', id })),
                    ]
                } else return [{ type: 'Catagory', id: 'LIST' }]
            },



        }),
        updateCatagory: builder.mutation({
            query: initialCatags => ({
                url: `/catalo/${initialCatags.id}/update`,
                method: 'PATCH',
                body: {
                    ...initialCatags
                }
            }),
            invalidatesTags: [
                { type: 'Catagory', id: 'LIST' }
            ]
        }),
        createCatagory: builder.mutation({
            query: initialCatags => ({
                url: "/catalo",
                method: 'POST',
                body: {
                    ...initialCatags
                }
            }),
            invalidatesTags: [
                { type: 'Catagory', id: 'LIST' }
            ]
        }),
        deleteCatagory: builder.mutation({
            query: id => ({
                url: `catalo/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Catagory', id: arg.id }
            ]
        })


    })
})

export const {
    useGetCatagoryQuery,
    useUpdateCatagoryMutation,
    useCreateCatagoryMutation,
    useDeleteCatagoryMutation
} = catagoryApiSlice