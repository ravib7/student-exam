import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/auth", credentials: "include" }),
    endpoints: (builder) => {
        return {

            userRegister: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-register",
                        method: "POST",
                        body: userData
                    }
                },
            }),


            userLogin: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-login",
                        method: "POST",
                        body: userData
                    }
                },
                transformResponse: data => {
                    localStorage.setItem("user", JSON.stringify(data))
                    return data
                }
            }),


            userLogout: builder.mutation({
                query: userData => {
                    return {
                        url: "/user-logout",
                        method: "POST",
                    }
                },
                transformResponse: data => {
                    localStorage.removeItem("user")
                    return data.result
                }
            }),

        }
    }
})

export const { useUserRegisterMutation, useUserLoginMutation, useUserLogoutMutation } = authApi
