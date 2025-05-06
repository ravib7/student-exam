import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user" }),
    tagTypes: ["user"],
    endpoints: (builder) => {
        return {
            getResult: builder.query({
                query: () => {
                    return {
                        url: "/result",
                        method: "GET"
                    }
                },
                providesTags: ["user"]
            }),

            userExam: builder.query({
                query: () => {
                    return {
                        url: "/user-exam-fetch",
                        method: "GET",
                    }
                },
                invalidatesTags: ["user"]
            }),

            examTime: builder.query({
                query: () => {
                    return {
                        url: "/get-exam-time",
                        method: "GET",
                    }
                },
                invalidatesTags: ["user"]
            }),

            examCheck: builder.mutation({
                query: examData => {
                    return {
                        url: "/user-exam-check",
                        method: "POST",
                        body: examData
                    }
                },
                invalidatesTags: ["user"]
            }),

        }
    }
})

export const {
    useGetResultQuery,
    useLazyGetResultQuery,
    useExamTimeQuery,
    useExamCheckMutation
} = userApi
