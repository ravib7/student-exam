import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import UserProtected from './users/components/UserProtected'
import AdminProtected from './admin/components/AdminProtected'
import Success from './users/pages/Sucess'
const AdminHome = lazy(() => import("./admin/pages/AdminHome"))
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"))
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"))
const AdminExam = lazy(() => import("./admin/pages/AdminExam"))
const UserExam = lazy(() => import("./users/pages/UserExam"))
const Login = lazy(() => import("./users/pages/UserLogin"))
const Register = lazy(() => import("./users/pages/UserRegister"))
const Layout = lazy(() => import("./users/components/Layout"))

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return <>
    <h1>{error.message}</h1>
    <button onClick={resetErrorBoundary}>Retry</button>
  </>
}

const App = () => {

  const location = useLocation()
  const Fallback = () => <h1>Loading...</h1>

  const USER_ROUETS = [
    { path: "/", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "userexam", element: <UserProtected><UserExam /></UserProtected> },
    { path: "usersuccess", element: <Success /> },
  ]

  const ADMIN_ROUETS = [
    { path: "", element: <AdminLogin /> },
    { path: "adminhome", element: <AdminHome /> },
    { path: "adminexam", element: <><AdminExam /></> }
  ]

  return <>

    <ToastContainer />

    <Routes>
      <Route path='/' element={<><Layout /></>}>
        {
          USER_ROUETS.map((item, index) => <Route
            key={index}
            path={item.path}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>


      <Route path='/admin' element={<AdminLayout />}>
        {
          ADMIN_ROUETS.map((item, index) => <Route
            key={index}
            path={item.path}
            element={
              <ErrorBoundary resetKeys={[location.pathname]} FallbackComponent={ErrorFallback}>
                <Suspense fallback={<Fallback />}>
                  {item.element}
                </Suspense>
              </ErrorBoundary>
            }
          />)
        }
      </Route>
    </Routes>
  </>
}

export default App