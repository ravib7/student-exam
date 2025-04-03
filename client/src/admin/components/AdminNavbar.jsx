import React from 'react'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
    return <>
        <nav class="navbar navbar-expand-lg bg-primary navbar-dark mb-5">
            <div class="container">
                <Link to="/admin" class="navbar-brand">Admin Panel</Link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ms-auto gap-2">
                        <Link to="" class="nav-link active">Login</Link>
                        <Link to="/admin/register" class="nav-link active">Register</Link>
                        <Link to="/admin/adminexam" class="nav-link active">Exam</Link>
                    </div>
                </div>
                <div class="dropdown">
                    <button class="btn btn-light dropdown-toggle ms-3" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" >
                        Welcome RC
                    </button>
                    <ul class="dropdown-menu">
                        <li><button class="dropdown-item text-danger">Logout</button></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}

export default AdminNavbar