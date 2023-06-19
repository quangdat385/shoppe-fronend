import { createEntityAdapter } from '@reduxjs/toolkit';


import { apiSlice } from '~/app/api/apiSlice';
import { setSearch, SearchHistory, setKeyWords } from "~/features/search/searchSlice";

const productsAdapter = createEntityAdapter({});

const initialState = productsAdapter.getInitialState();



export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //get api/product
        getProducts: builder.query({
            query: () => ({
                url: "/product",
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {

                const loadedproducts = responseData.map(product => {
                    product.id = product._id
                    return product
                });

                return productsAdapter.setAll(initialState, loadedproducts);
            },
            providesTags: (result, error, arg) => {

                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'product', id })),
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            },



        }),
        getSearch: builder.mutation({
            query: ({ keyword, details }) => ({
                url: `/product/hot/search?keyword=${keyword}&details=${details}`,
                method: 'GET',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {

                try {
                    const { data } = await queryFulfilled


                    const { products, history } = data;

                    dispatch(setSearch({ products }))

                    if (history.keyword === "") {
                        return
                    }

                    dispatch(setKeyWords({ history }))
                    const listHistory = getState().search.history
                    let check = listHistory.every((item) => {
                        return item.keyword !== history.keyword
                    })

                    if (check) {
                        dispatch(SearchHistory({ history }))
                    }

                } catch (err) {
                    console.log(err)
                }
            }


        }),
        getSearchProducts: builder.query({
            query: ({ page, collection, order, price }) => ({
                url: `/product/_search?page=${page}&collection=${collection}&price=${price}&order=${order}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            transformResponse: responseData => {
                localStorage.setItem("total_pages", JSON.stringify(responseData.totalPages));
                const loadedproducts = responseData.data?.map(product => {
                    product.id = product._id
                    return product
                });

                return productsAdapter.setAll(initialState, loadedproducts);
            },
            providesTags: (result, error, arg) => {

                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'product', id })),
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            },



        }),
        //get product soft delete /deleted/product
        getSoftDeleteproducts: builder.mutation({
            query: () => ({
                url: '/deleted/product',
                method: 'GET'
            }),
            transformResponse: responseData => {

                const data = responseData.map(product => {
                    product.id = product._id
                    return product
                });
                return data
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'product', id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            },
        }),
        //ad new product product/create
        addNewproduct: builder.mutation({
            query: initialproductData => ({
                url: '/product/create',
                method: 'POST',
                body: {
                    ...initialproductData
                }
            }),
            invalidatesTags: [
                { type: 'Product', id: 'LIST' }
            ]
        }),


        //update product 
        updateproduct: builder.mutation({
            query: initialproductData => ({
                url: `/product/${initialproductData.id}/update`,
                method: 'PATCH',
                body: { ...initialproductData }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }]
        }),
        postImgProduct: builder.mutation({
            query: initialproduct => ({
                url: "product/post/img/url",
                method: 'POST',
                body: { ...initialproduct }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }]
        }),
        updateLikes: builder.mutation({
            query: (id, initialproduct) => ({
                url: `product/${id}/update/likes`,
                method: 'PATCH',
                body: { ...initialproduct }
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Product', id: arg.id }]
        }),

        //soft delete product method delete product/:id/soft/delete
        softDelete: builder.mutation({
            query: id => ({
                url: `product/${id}/soft/delete`,
                method: 'DELETE',

            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        //delete product method delete product/:id/delete
        deleteproduct: builder.mutation({
            query: id => ({
                url: `product/${id}/delete`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        //restore product method patch product/:id/restore
        restoreproduct: builder.mutation({
            query: id => ({
                url: `product/${id}/restore`,
                method: 'PATCH'
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        })
    })

})

export const {
    useGetProductsQuery,
    useUpdateLikesMutation,
    useGetSearchMutation,
    useGetSearchProductsQuery,
    useGetSoftDeleteproductsMutation,
    useAddNewproductMutation,
    useUpdateproductMutation,
    useSoftDeleteMutation,
    useDeleteproductMutation,
    useRestoreproductMutation,
    usePostImgProductMutation,
    usePrefetch
} = productsApiSlice