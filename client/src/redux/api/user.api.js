import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/user", credentials: "include" }),
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

            getExamName: builder.query({
                query: () => {
                    return {
                        url: "/get-exam-name",
                        method: "GET",
                    }
                },
                providesTags: ["user"]
            }),

            userExam: builder.query({
                query: examId => {
                    return {
                        url: "/user-exam-fetch",
                        method: "GET",
                        params: { examId }
                    }
                },
                providesTags: ["user"]
            }),

            examTime: builder.query({
                query: () => {
                    return {
                        url: "/get-exam-time",
                        method: "GET",
                    }
                },
                providesTags: ["user"]
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
    useGetExamNameQuery,
    useLazyUserExamQuery,
    useExamTimeQuery,
    useExamCheckMutation
} = userApi
