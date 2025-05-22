import React, { useState } from 'react'
import { useGetPaperNameQuery, useGetUsersResultsQuery } from '../../redux/api/admin.api'

const UserResults = () => {

    const [currentIndex, setCurrentIndex] = useState(0)

    const [examId, setExamId] = useState(null)

    console.log(examId);


    const { data } = useGetUsersResultsQuery(examId)

    const { data: examData } = useGetPaperNameQuery()

    const item = data?.userResult[currentIndex]

    // if (!item) {
    //     return <p className="text-center mt-5">Loading or no results found.</p>
    // }

    // Step 1: Calculate obtained marks
    const obtainedMarks = item?.answers
        .filter(ans => ans.isCorrect)
        .reduce((sum, ans) => sum + (ans.marks || 0), 0)

    // Step 2: Calculate total marks
    const totalMarks = item?.answers
        .reduce((sum, ans) => sum + (ans.marks || 0), 0)

    // Step 3: Calculate percentage
    const percentage = totalMarks ? ((obtainedMarks / totalMarks) * 100).toFixed(2) : "0.00";

    const grade = percentage >= 90 ? 'A' :
        percentage >= 80 ? 'B' :
            percentage >= 70 ? 'C' :
                percentage >= 60 ? 'D' :
                    percentage >= 50 ? 'E' : 'F';

    const status = percentage >= 50 ? 'Pass' : 'Fail';


    return <>
        <select class="container form-select mb-5 w-25" onChange={e => setExamId(e.target.value)}>
            <option value="" selected disabled>Select Exam Name</option>
            {
                examData && examData.result.map(item =>
                    <option
                        value={item._id}
                        id={item._id}>
                        {item.examName}
                    </option>)
            }
        </select>
        {

            <div className='container-fluid'>
                <div className="card mb-5">
                    <div className="card-header bg-primary text-light fs-4 text-center">
                        REPORT CARD
                    </div>
                    <div className="card-body">
                        <div className="row gap-md-4 pe-5 ms-5 mt-3">
                            <div className='col-sm-12 col-md-2 mb-sm-5'>
                                <img className='rounded align-items-end shadow-sm' src={item?.userImage} alt={item?.userImage} height={100} width={100} />
                            </div>
                            <div className='col-sm-12 col-md-4'>
                                <p className='fs-6'>
                                    <strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>
                                        Student Name
                                    </strong> :  {item?.userName}
                                </p>
                                <p className='fs-6'>
                                    <strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>
                                        Student Email
                                    </strong> :  {item?.userEmail}
                                </p>
                                <p className='fs-6'>
                                    <strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>
                                        Mobile Number
                                    </strong> :  {item?.userMobile}
                                </p>
                            </div>
                            <div className='col-sm-12 col-md-3'>
                                <p className='fs-6'>
                                    <strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>
                                        Total Marks :
                                    </strong>  {obtainedMarks} / {totalMarks}
                                </p>
                                <p className='fs-6'>
                                    <strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>
                                        Percentage :
                                    </strong> {percentage}%
                                </p>
                                <p className='fs-6'>
                                    <strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>
                                        Grade :
                                    </strong> {grade}
                                </p>
                            </div>
                            <div className='col-sm-12 col-md-2'>
                                <p className='fs-6'>
                                    <strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>
                                        Status :
                                    </strong> {status}
                                </p>
                            </div>
                        </div>

                        <table className='table table-bordered table-hover table-responsive-sm text-center mt-4'>
                            <thead>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Question</th>
                                    <th>Selected Option</th>
                                    <th>Correct Answer</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    item?.answers.map((ans, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{ans.question}</td>
                                            <td>{ans.selectedOption}</td>
                                            <td>{ans.correctAnswer}</td>
                                            <td>{ans.isCorrect ? <span>✔</span> : <span>❌</span>}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='d-flex justify-content-between align-item-center m-3 '>
                    <button disabled={currentIndex === 0} onClick={e => setCurrentIndex(currentIndex - 1)} type="button" class="btn btn-primary"><i class="bi bi-chevron-double-left"></i> Previous</button>
                    <button disabled={currentIndex === data?.userResult?.length - 1} onClick={e => setCurrentIndex(currentIndex + 1)} type="button" class="btn btn-primary">Next <i class="bi bi-chevron-double-right"></i></button>
                </div>
            </div>
        }
    </>
}

export default UserResults
