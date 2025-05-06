import React, { useState } from 'react'
import { useGetUsersResultsQuery } from '../../redux/api/admin.api'
import { useSelector } from 'react-redux'

const Result = () => {
    // const [currentIndex, setCurrentIndex] = useState(0)

    const { data } = useGetUsersResultsQuery()

    // const { user } = useSelector(state => state.auth)

    // const loggedInUserId = user?.id

    // const filteredResult = data?.userResult.filter(item => item.userId === loggedInUserId)

    // if (!filteredResult || filteredResult.length === 0) {
    //     return <p className="text-center mt-5">Loading or no results found.</p>
    // }

    const item = data[currentIndex]

    const obtainedMarks = item.answers
        .filter(ans => ans.isCorrect)
        .reduce((sum, ans) => sum + (ans.marks || 0), 0)

    const totalMarks = item.answers.reduce((sum, ans) => sum + (ans.marks || 0), 0)

    const percentage = totalMarks ? ((obtainedMarks / totalMarks) * 100).toFixed(2) : "0.00"

    const grade = percentage >= 90 ? 'A' :
        percentage >= 80 ? 'B' :
            percentage >= 70 ? 'C' :
                percentage >= 60 ? 'D' :
                    percentage >= 50 ? 'E' : 'F'

    const status = percentage >= 50 ? 'Pass' : 'Fail'

    return (
        <div className='container-fluid'>
            <div className="card mb-5">
                <div className="card-header bg-primary text-light fs-4 text-center">REPORT CARD</div>
                <div className="card-body">
                    <div className="row gap-md-4 pe-5 ms-5 mt-3">
                        <div className='col-sm-12 col-md-2 mb-sm-5'>
                            <img className='rounded shadow-sm' src={item.userImage} alt="User" height={100} width={100} />
                        </div>
                        <div className='col-sm-12 col-md-4'>
                            <p className='fs-6'><strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>Student Name</strong> : {item.userName}</p>
                            <p className='fs-6'><strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>Student Email</strong> : {item.userEmail}</p>
                            <p className='fs-6'><strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>Mobile Number</strong> : {item.userMobile}</p>
                        </div>
                        <div className='col-sm-12 col-md-3'>
                            <p className='fs-6'><strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>Total Marks :</strong> {obtainedMarks} / {totalMarks}</p>
                            <p className='fs-6'><strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>Percentage :</strong> {percentage}%</p>
                            <p className='fs-6'><strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>Grade :</strong> {grade}</p>
                        </div>
                        <div className='col-sm-12 col-md-2'>
                            <p className='fs-6'><strong className='text-decoration-underline' style={{ textUnderlineOffset: 5 }}>Status :</strong> {status}</p>
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
                                item.answers.map((ans, index) => (
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

        </div>
    )
}

export default Result
