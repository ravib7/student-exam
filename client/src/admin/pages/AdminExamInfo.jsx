import React, { useEffect, useState } from 'react'
import { useExamDeleteTimeMutation, useGetExamTimeQuery } from '../../redux/api/admin.api'
import { format } from "date-fns"
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'
import { toast } from "react-toastify"

const AdminExamInfo = () => {


    // const [examId, setExamId] = useState(null)
    // console.log(examId);

    const navigate = useNavigate()

    const { data } = useGetExamTimeQuery()

    const [timeDelete, { isSuccess, isLoading, isError, error }] = useExamDeleteTimeMutation()

    useEffect(() => {
        if (isSuccess) {
            toast.error("Exam Time Delete Successfully")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to delete")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }


    return <>
        <div className='container-fluid'>
            {/* <div className='row gap-5 justify-content-center'>
                {
                    data && data.result.map(item => <div className='col-md-5 mb-5'>
                        <div class="card">
                            <div class="card-header bg-primary text-light"><span className='fs-5'>{item.examName}</span></div>
                            <div class="card-body me-auto">
                                <p>Start Time : {format(new Date(item.startTime), 'hh:mm a')}</p>
                                <p>End Time : {format(new Date(item.endTime), 'hh:mm a')}</p>
                                <p>Date : {format(item.examDate, "EEEE dd MMMM yyyy")}</p>
                            </div>
                            <div class="card-footer d-flex justify-content-between align-content-center">
                                <div>
                                    <button type="button" class="btn btn-primary">View Questions</button>
                                </div>
                                <div>
                                    <button type="button" class="btn btn-warning me-3 text-light"><i class="bi bi-pencil-fill"></i></button>
                                    <button type="button" class="btn btn-danger"><i class="bi bi-trash-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
                }
            </div> */}


            {
                data && <table className='table table-bordered text-center table-hover table-light'>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>Exam Name</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Exam Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        data.result.map((item, index) => <tbody key={item._id}>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.examName}</td>
                                <td>{format(new Date(item.startTime), 'hh:mm a')}</td>
                                <td>{format(new Date(item.endTime), 'hh:mm a')}</td>
                                <td>{format(item.examDate, "EEEE dd MMMM yyyy")}</td>
                                <td>
                                    <button type="button" onClick={() => navigate("/admin/exam-time", { state: item })} class="btn btn-warning me-3 text-light"><i class="bi bi-pencil-fill"></i></button>
                                    <button type="button" onClick={() => timeDelete(item._id)} class="btn btn-danger me-3"><i class="bi bi-trash-fill"></i></button>
                                    <button type="button" onClick={() => navigate(`/admin/exam-dashboard/${item._id}`)} class="btn btn-primary"><i class="bi bi-eye-fill"></i></button>
                                </td>
                            </tr>
                        </tbody>)
                    }
                </table>
            }
        </div >
    </>
}

export default AdminExamInfo