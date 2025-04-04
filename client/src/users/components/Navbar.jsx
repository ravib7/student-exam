
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"
import { useUserLogoutMutation } from '../../redux/api/auth.api'

const Navbar = () => {

    const [logout] = useUserLogoutMutation()
    const { user } = useSelector(state => state.auth)

    return <>
        <nav class="navbar navbar-expand-lg bg-primary navbar-dark mb-5 sticky-top z-50">
            <div class="container">
                <Link to="/" class="navbar-brand" href="#">Authentication</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto gap-2">
                        <Link to="/" class="nav-link active">Login</Link>
                        <Link to="/register" class="nav-link active">Register</Link>
                        <Link to="/userexam" class="nav-link active">Exam</Link>
                    </div>
                </div>
                <div class="dropdown">
                    {
                        user && <button class="btn btn-light ms-3 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                            <img src={user.picture} referrerPolicy="no-referrer" width={40} height={40} className='rounded-5 me-2' alt="" />
                            {user.name}
                        </button>
                    }
                    <ul class="dropdown-menu">
                        <li><button onClick={logout} class="dropdown-item text-danger">Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar