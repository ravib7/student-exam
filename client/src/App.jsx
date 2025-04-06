import React, { lazy, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/ReactToastify.css"
import UserProtected from './users/components/UserProtected'
import AdminProtected from './admin/components/AdminProtected'
const AdminLayout = lazy(() => import("./admin/components/AdminLayout"))
const AdminLogin = lazy(() => import("./admin/pages/AdminLogin"))
// const AdminRegister = lazy(() => import("./admin/pages/AdminRegister"))
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
  ]

  const ADMIN_ROUETS = [
    { path: "", element: <AdminLogin /> },
    // { path: "adminregister", element: <AdminRegister /> },
    { path: "adminexam", element: <AdminProtected><AdminExam /></AdminProtected> }
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