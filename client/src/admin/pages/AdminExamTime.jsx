import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useFormik } from 'formik'
import * as yup from "yup"
import { toast } from "react-toastify"
import HandleClasses from '../components/HandleClasses'
import { useExamTimeSetMutation, useExamUpdateTimeMutation } from '../../redux/api/admin.api'
import { useLocation, useNavigate } from 'react-router-dom'
import { parse, format } from "date-fns"


const AdminExamTime = () => {

    const location = useLocation()
    const updateTime = location.state


    const navigate = useNavigate()

    const [setTime, { isSuccess, isLoading, isError, error }] = useExamTimeSetMutation()
    const [timeUpdate, { isSuccess: updateIsSuccess, isLoading: updateIsLoading, isError: updateIsError, error: updateError }] = useExamUpdateTimeMutation()

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            examName: updateTime ? updateTime.examName : "",
            startTime: updateTime ? format(new Date(updateTime.startTime), "HH:mm") : "",
            endTime: updateTime ? format(new Date(updateTime.endTime), "HH:mm") : "",
            examDate: updateTime ? format(new Date(updateTime.examDate), "yyyy-MM-dd") : "",
        },
        validationSchema: yup.object({
            examName: yup.string().required(),
            startTime: yup.string().required(),
            endTime: yup.string().required(),
            examDate: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            if (updateTime) {
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

                timeUpdate({
                    examName: values.examName,
                    examDate: values.examDate,
                    startTime: startDateTime,
                    endTime: endDateTime,
                    _id: updateTime._id
                })
            } else {
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
            }

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
        if (updateIsSuccess) {
            toast.success("Exam Time Update Successfully")
            navigate("/admin")
        }
    }, [updateIsSuccess])

    useEffect(() => {
        if (isError) {
            toast.error("unable to set exam time")
        }
    }, [isError])

    useEffect(() => {
        if (updateIsError) {
            toast.error(updateError.data.message || "unable to update")
        }
    }, [updateIsError])

    if (isLoading || updateIsLoading) {
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
                                {
                                    updateTime
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

export default AdminExamTime