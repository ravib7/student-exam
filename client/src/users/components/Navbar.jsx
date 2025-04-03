import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from "react-router-dom"

const Navbar = () => {

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
                    <button class="btn btn-light ms-3 dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        {user.name}
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item text-danger" href="#">Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default Navbar