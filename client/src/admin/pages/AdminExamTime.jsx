import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useFormik } from 'formik'
import * as yup from "yup"
import { toast } from "react-toastify"
import HandleClasses from '../components/HandleClasses'
import { useExamTimeSetMutation } from '../../redux/api/admin.api'
import { useNavigate } from 'react-router-dom'
import { format, parse } from "date-fns"

const AdminExamTime = () => {

    const navigate = useNavigate()

    const [setTime, { isSuccess, isLoading, isError, error }] = useExamTimeSetMutation()

    const formik = useFormik({
        initialValues: {
            examName: "",
            startTime: "",
            endTime: "",
            examDate: "",
        },
        validationSchema: yup.object({
            examName: yup.string().required(),
            startTime: yup.string().required(),
            endTime: yup.string().required(),
            examDate: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            const startDateTime = parse(
                `${values.examDate} ${values.startTime}`,
                'yyyy-MM-dd HH:mm',
                new Date()
            );

            const endDateTime = parse(
                `${values.examDate} ${values.endTime}`,
                'yyyy-MM-dd HH:mm',
                new Date()
            );

            setTime({
                examName: values.examName,
                examDate: values.examDate,
                startTime: startDateTime,
                endTime: endDateTime,
            });

            resetForm();
        }
    })


    useEffect(() => {
        if (isSuccess) {
            toast.success("Exam Time set Successfully")
            navigate("/admin/admin-exam")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error("unable to set exam time")
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
                        <div class="card-header bg-primary text-light fs-4 text-center">Exam Time Form</div>
                        <form onSubmit={formik.handleSubmit}>
                            <div class="card-body">
                                <div class="mt-2">
                                    <label for="examName" class="form-label">Enter Exam Name</label>
                                    <input
                                        {...formik.getFieldProps("examName")}
                                        type="text"
                                        class={HandleClasses(formik, "examName")}
                                        id="examName"
                                        placeholder="Enter Exam Name"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.examName}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="startTime" class="form-label">Enter Start Time</label>
                                    <input
                                        {...formik.getFieldProps("startTime")}
                                        type="time"
                                        class={HandleClasses(formik, "startTime")}
                                        id="startTime"
                                        placeholder="Enter Start Time"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.startTime}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="endTime" class="form-label">Enter End Time</label>
                                    <input
                                        {...formik.getFieldProps("endTime")}
                                        type="time"
                                        class={HandleClasses(formik, "endTime")}
                                        id="endTime"
                                        placeholder="Enter End Time"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.endTime}</div>
                                </div>
                                <div class="mt-2">
                                    <label for="examDate" class="form-label">Enter Exam Date</label>
                                    <input
                                        {...formik.getFieldProps("examDate")}
                                        type="date"
                                        class={HandleClasses(formik, "examDate")}
                                        id="examDate"
                                        placeholder="Enter Exam Date"
                                    />
                                    <div class="valid-feedback">Looks good!</div>
                                    <div class="invalid-feedback">{formik.errors.examDate}</div>
                                </div>
                                <button type="submit" class="btn btn-primary w-100 mt-3">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AdminExamTime