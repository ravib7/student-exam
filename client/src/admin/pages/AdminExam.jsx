import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import HandleClasses from '../components/HandleClasses'
import { useCreateExamMutation, useDeleteExamMutation, useGetPaperQuery, useUpdateExamMutation } from '../../redux/api/exam.api'
import Loading from '../components/Loading'
import { toast } from "react-toastify"
import { useLocation, useNavigate } from 'react-router-dom'

const AdminExam = () => {

    const navigate = useNavigate()

    const location = useLocation()
    const updateData = location.state

    const [examCreate, { isSuccess, isLoading, isError, error }] = useCreateExamMutation()
    const { data } = useGetPaperQuery()
    const [examUpdate, { isSuccess: updateIsSuccess, isLoading: updateIsLoading, isError: updateIsError, error: updateError }] = useUpdateExamMutation()
    const [examDelete, { isSuccess: deleteIsSuccess, isLoading: deleteIsLoading, isError: deleteIsError, error: deleteError }] = useDeleteExamMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            question: updateData ? updateData.question : "",
            firstoption: updateData ? updateData.firstoption : "",
            secondoption: updateData ? updateData.secondoption : "",
            thirdoption: updateData ? updateData.thirdoption : "",
            fourthoption: updateData ? updateData.fourthoption : "",
            correctAnswer: updateData ? updateData.correctAnswer : "",
        },
        validationSchema: yup.object({
            question: yup.string().required(),
            firstoption: yup.string().required(),
            secondoption: yup.string().required(),
            thirdoption: yup.string().required(),
            fourthoption: yup.string().required(),
            correctAnswer: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            if (updateData) {
                examUpdate({ ...values, _id: updateData._id })
            } else {
                examCreate(values)
            }
            resetForm()
        }
    })

    useEffect(() => {
        if (isSuccess) {
            toast.success("Exam Create Successfully")
            navigate("/admin/adminhome")
        }
    }, [isSuccess])

    useEffect(() => {
        if (updateIsSuccess) {
            toast.success("Exam Update Successfully")
            navigate("/admin/adminhome")
        }
    }, [updateIsSuccess])


    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to Create")
        }
    }, [isError])

    useEffect(() => {
        if (updateIsError) {
            toast.error(updateError.data.message || "unable to Update")
        }
    }, [updateIsError])

    if (isLoading || updateIsLoading) {
        return <Loading />
    }

    return <>
        <div class="container mb-5">
            <div class="row">
                <div class="col-sm-6 offset-sm-3">
                    <div class="card">
                        <div class="card-header bg-primary text-light fs-5 text-center">Exam Panel</div>
                        <form onSubmit={formik.handleSubmit} autoComplete='off'>
                            <div class="card-body">
                                <div>
                                    <label for="qusetion" class="form-label">Enter Question</label>
                                    <input
                                        {...formik.getFieldProps("question")}
                                        type="text"
                                        class={HandleClasses(formik, "question")}
                                        id="question"
                                        placeholder="Enter Your Question"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.question}</div>
                                </div>

                                <div>
                                    <label for="firstoption" class="form-label">Enter First Answer</label>
                                    <input
                                        {...formik.getFieldProps("firstoption")}
                                        type="text"
                                        class={HandleClasses(formik, "firstoption")}
                                        id="firstoption"
                                        placeholder="Enter First Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.firstoption}</div>
                                </div>

                                <div>
                                    <label for="secondoption" class="form-label">Enter Second Answer </label>
                                    <input
                                        {...formik.getFieldProps("secondoption")}
                                        type="text"
                                        class={HandleClasses(formik, "secondoption")}
                                        id="secondoption"
                                        placeholder="Enter Second Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.secondoption}</div>
                                </div>

                                <div>
                                    <label for="thirdoption" class="form-label">Enter Third Answer</label>
                                    <input
                                        {...formik.getFieldProps("thirdoption")}
                                        type="text"
                                        class={HandleClasses(formik, "thirdoption")}
                                        id="thirdoption"
                                        placeholder="Enter Third Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.thirdoption}</div>
                                </div>

                                <div>
                                    <label for="fourthoption" class="form-label">Enter Fourth Answer</label>
                                    <input
                                        {...formik.getFieldProps("fourthoption")}
                                        type="text"
                                        class={HandleClasses(formik, "fourthoption")}
                                        id="fourthoption"
                                        placeholder="Enter Fourth Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.fourthoption}</div>
                                </div>


                                <div>
                                    <label for="correctAnswer" class="form-label">Enter Correct Answer</label>
                                    <input
                                        {...formik.getFieldProps("correctAnswer")}
                                        type="text"
                                        class={HandleClasses(formik, "correctAnswer")}
                                        id="correctAnswer"
                                        placeholder="Enter Correct Answer"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.correctAnswer}</div>
                                </div>
                                {
                                    updateData
                                        ? <button type="submit" class="btn btn-warning text-light w-100 mt-3">Update</button>
                                        : <button type="submit" class="btn btn-primary w-100 mt-3">Submit</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AdminExam