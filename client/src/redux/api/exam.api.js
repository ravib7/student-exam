import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const examApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/exam", credentials: "include" }),
    tagTypes: ["exam"],
    endpoints: (builder) => {
        return {
            getPaper: builder.query({
                query: () => {
                    return {
                        url: "/exam-fetch",
                        method: "GET"
                    }
                },
                providesTags: ["exam"]
            }),

            createExam: builder.mutation({
                query: examData => {
                    return {
                        url: "/exam-create",
                        method: "POST",
                        body: examData
                    }
                },
                invalidatesTags: ["exam"]
            }),

            updateExam: builder.mutation({
                query: examData => {
                    return {
                        url: "/exam-update/" + examData._id,
                        method: "PATCH",
                        body: examData
                    }
                },
                invalidatesTags: ["exam"]
            }),


            deleteExam: builder.mutation({
                query: _id => {
                    return {
                        url: "/exam-delete/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["exam"]
            }),

            userExamCheck: builder.mutation({
                query: examData => {
                    return {
                        url: "/user-exam-check",
                        method: "POST",
                        body: examData
                    }
                },
                invalidatesTags: ["exam"]
            }),

            getUsersResults: builder.query({
                query: () => {
                    return {
                        url: "/user-results",
                        method: "GET",
                    }
                },
                providesTags: ["exam"]
            }),

        }
    }
})

export const {
    useCreateExamMutation,
    useLazyGetPaperQuery,
    useDeleteExamMutation,
    useUpdateExamMutation,

    useUserExamCheckMutation,
    useGetUsersResultsQuery
} = examApi
