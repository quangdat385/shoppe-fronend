import { apiSlice } from "~/app/api/apiSlice";

import {
    logOut, setCredentials
} from "./authSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        //login 
        login: builder.mutation({
            query: credentials => ({
                url: "/auth/login",
                method: "POST",
                body: { ...credentials },
            })
        }),
        register: builder.mutation({
            query: (client) => ({
                url: "/auth/register",
                method: "POST",
                body: { ...client },
            })
        }),
        loginAndUpdate: builder.mutation({
            query: initialdata => ({
                url: 'auth/update/login',
                method: "PUT",
                body: { ...initialdata }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled

                    const { accessToken } = data

                    dispatch(setCredentials({ accessToken }))

                } catch (err) {
                    console.error(err)
                }
            }
        }),
        confirmPassword: builder.mutation({
            query: initialdata => ({
                url: "auth/confirm",
                method: "POST",
                body: { ...initialdata }
            })
        }),
        forgotPassword: builder.mutation({
            query: initialdata => ({
                url: "auth/forgot/password",
                method: "PUT",
                body: { ...initialdata }
            })
        })
        ,
        //logout user
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {

                    await queryFulfilled

                    dispatch(logOut())

                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    })

                } catch (err) {
                    console.log(err);
                }
            }
        }),
        //refresh token 
        refresh: builder.mutation({
            query: () => ({
                url: "/auth/refresh",
                method: "GET",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {

                try {
                    const { data } = await queryFulfilled


                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
    useLoginAndUpdateMutation,
    useRegisterMutation,
    useConfirmPasswordMutation,
    useForgotPasswordMutation
} = authApiSlice 