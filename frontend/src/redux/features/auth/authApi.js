import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from '../../apiBase';


const authApi =createApi({
    reducerPath : "authApi",
    baseQuery: baseQuery,
    endpoints:(builder) => ({
        registerUser: builder.mutation({
            query: (newUser) => ({
                url : `/api/auth/register`,
                method : 'POST',
                body: newUser
            })
        }),
        loginUser : builder.mutation({
            query: (credentials) => ({
                url: `/api/auth/login`,
                method: 'POST',
                body: credentials
            })
        }),
        logoutUser : builder.mutation({
            query : () => ({
                url : `/api/auth/logout`,
                method : 'POST'

            })
        })
    })

})

export const{useLoginUserMutation,useRegisterUserMutation,useLogoutUserMutation} = authApi

export default authApi
