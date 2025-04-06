import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import HandleClasses from '../../admin/components/HandleClasses'
import { toast } from 'react-toastify'
import Loading from '../../admin/components/Loading'
import { useAdminRegisterMutation } from '../../redux/api/auth.api'

const UserRegister = () => {

    const navigate = useNavigate()
    const [adminSignup, { isSuccess, isLoading, isError, error }] = useAdminRegisterMutation()

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            mobile: "",
            adminpicture: "",
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            email: yup.string().required().email(),
            mobile: yup.string().required(),
            adminpicture: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            const fd = new FormData()
            fd.append("name", values.name),
                fd.append("email", values.email),
                fd.append("mobile", values.mobile),
                fd.append("adminpicture", values.adminpicture),
                adminSignup(fd)
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Admin Register Successfully")
            navigate("/admin")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to register")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }

    return <>
        <div class="container">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header bg-primary text-light fs-4 text-center">Signup</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="card-body">
                                <div>
                                    <label for="name" class="form-label">Enter Full Name</label>
                                    <input
                                        {...formik.getFieldProps("name")}
                                        type="text"
                                        class={HandleClasses(formik, "name")}
                                        id="name"
                                        placeholder="Enter your name"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.name}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="email" class="form-label">Enter Email</label>
                                    <input
                                        {...formik.getFieldProps("email")}
                                        type="email"
                                        class={HandleClasses(formik, "email")}
                                        id="email"
                                        placeholder="Enter Your Email"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.email}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="mobile" class="form-label">Enter Mobile Number</label>
                                    <input
                                        {...formik.getFieldProps("mobile")}
                                        type="number"
                                        class={HandleClasses(formik, "mobile")}
                                        id="mobile"
                                        placeholder="Enter Your Mobile"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.mobile}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="cpassword" class="form-label">Upload Your Image</label>
                                    <input
                                        onChange={(e) => {
                                            formik.setFieldValue("adminpicture", e.target.files[0])
                                        }}
                                        type="file"
                                        class={HandleClasses(formik, "adminpicture")}
                                        id="image"
                                        placeholder="Confirm Your Password"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">
                                        {formik.errors.adminpicture}
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Signup
                                </button>
                                <p class="text-center mt-3">
                                    Already Have Account? <Link to="/admin">Login</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default UserRegister