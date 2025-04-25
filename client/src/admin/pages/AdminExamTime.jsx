import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import { useFormik } from 'formik'
import * as yup from "yup"
import { toast } from "react-toastify"
import HandleClasses from '../components/HandleClasses'
import { useExamTimeSetMutation } from '../../redux/api/exam.api'
import { useNavigate } from 'react-router-dom'

const AdminExamTime = () => {

    const navigate = useNavigate()

    const [setTime, { isSuccess, isLoading, isError, error }] = useExamTimeSetMutation()

    const formik = useFormik({
        initialValues: {
            startTime: "",
            endTime: "",
            examDate: "",
        },
        validationSchema: yup.object({
            startTime: yup.string().required(),
            endTime: yup.string().required(),
            examDate: yup.string().required(),
        }),
        onSubmit: (values, { resetForm }) => {
            const { startDate, endDate } = convertToDate(values.startTime, values.endTime, values.examDate);

            setTime({
                startTime: startDate,
                endTime: endDate,
                examDate: new Date(values.examDate).toISOString()
            });

            resetForm()
        }
    })

    const convertToDate = (startTimeString, endTimeString, dateString) => {
        const [startHours, startMinutes] = startTimeString.split(':');
        const [endHours, endMinutes] = endTimeString.split(':');
        const [year, month, day] = dateString.split('-');


        const startDate = new Date(year, month - 1, day, startHours, startMinutes)
        const endDate = new Date(year, month - 1, day, endHours, endMinutes)

        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        };
    };



    useEffect(() => {
        if (isSuccess) {
            toast.success("Exam Time set Successfully")
            navigate("/admin/adminexam")
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