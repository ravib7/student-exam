import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const adminApi = createApi({
    reducerPath: "adminApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/admin", credentials: "include" }),
    tagTypes: ["admin"],
    endpoints: (builder) => {
        return {

            getPaper: builder.query({
                query: examId => {
                    return {
                        url: "/exam-fetch",
                        method: "GET",
                        params: { examId }
                    }
                },
                providesTags: ["admin"]
            }),

            getPaperName: builder.query({
                query: () => {
                    return {
                        url: "/exam-name",
                        method: "GET"
                    }
                },
                providesTags: ["admin"]
            }),

            createExam: builder.mutation({
                query: examData => {
                    return {
                        url: "/exam-create",
                        method: "POST",
                        body: examData,
                    }
                },
                invalidatesTags: ["admin"]
            }),

            updateExam: builder.mutation({
                query: examData => {
                    return {
                        url: "/exam-update/" + examData._id,
                        method: "PATCH",
                        body: examData
                    }
                },
                invalidatesTags: ["admin"]
            }),


            deleteExam: builder.mutation({
                query: _id => {
                    return {
                        url: "/exam-delete/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),

            getUsersResults: builder.query({
                query: examId => {
                    return {
                        url: `get-user-result/${examId}`,
                        method: "GET",
                        // params: { examId }
                    }
                },
                providesTags: ["admin"]
            }),

            examTimeSet: builder.mutation({
                query: examTime => {
                    return {
                        url: "/exam-time",
                        method: "POST",
                        body: examTime
                    }
                },
                invalidatesTags: ["admin"]
            }),

            getExamTime: builder.query({
                query: () => {
                    return {
                        url: "/get-time-details",
                        method: "GET",
                    }
                },
                providesTags: ["admin"]
            }),

            examUpdateTime: builder.mutation({
                query: timeData => {
                    return {
                        url: "/update-exam-time/" + timeData._id,
                        method: "PATCH",
                        body: timeData
                    }
                },
                invalidatesTags: ["admin"]
            }),

            examDeleteTime: builder.mutation({
                query: _id => {
                    return {
                        url: "/delete-exam-time/" + _id,
                        method: "DELETE",
                    }
                },
                invalidatesTags: ["admin"]
            }),
        }
    }
})

export const {
    useCreateExamMutation,
    useGetPaperNameQuery,
    useLazyGetPaperQuery,
    useDeleteExamMutation,
    useUpdateExamMutation,

    useExamTimeSetMutation,
    useGetUsersResultsQuery,
    useGetExamTimeQuery,
    useExamUpdateTimeMutation,
    useExamDeleteTimeMutation

} = adminApi
