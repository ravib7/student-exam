import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "./api/auth.api"
import authSlice from "./slice/auth.slice"
import { examApi } from "./api/exam.api"


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [examApi.reducerPath]: examApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, examApi.middleware]
})

export default reduxStore