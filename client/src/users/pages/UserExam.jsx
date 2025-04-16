import React, { useEffect, useState } from 'react'
import { useLazyGetPaperQuery, useUserExamCheckMutation } from '../../redux/api/exam.api'
import { useSelector } from 'react-redux'
import { toast } from "react-toastify"
import Loading from '../../admin/components/Loading'
import { useNavigate } from 'react-router-dom'

const UserExam = () => {

    const navigate = useNavigate()

    const currentUserId = useSelector(state => state.auth.user.id)
    const [userExamData, { isSuccess, isLoading, isError, error }] = useUserExamCheckMutation()

    const [paperData, setPaperData] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answer, setAnswer] = useState([])
    const [fetchPaper, { data }] = useLazyGetPaperQuery()
    const currentQuestion = paperData[currentQuestionIndex]


    useEffect(() => {
        fetchPaper()
    }, [])

    useEffect(() => {
        console.log(currentQuestionIndex);
    }, []);


    useEffect(() => {
        if (data && data.result) {
            const processedData = data.result.map(item => {
                const options = [
                    item.firstoption,
                    item.secondoption,
                    item.thirdoption,
                    item.fourthoption
                ]
                return { ...item, options }
            })
            setPaperData(processedData)
        }
    }, [data])

    const handleOptionSelect = value => {
        const answer = {
            userId: currentUserId,
            questionId: currentQuestion._id,
            question: currentQuestion.question,
            selectedOption: value
        }

        setAnswer(previous => {
            const updated = previous.filter(a => a.questionId !== currentQuestion._id)
            return [...updated, answer]
        })
    }

    const handleSubmit = async () => {
        const paperDataUser = {
            userId: currentUserId,
            answers: answer
        }

        await userExamData(paperDataUser)
    }

    useEffect(() => {
        if (isSuccess) {
            navigate("/usersuccess")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isError) {
            toast.error(error.data.message || "unable to submit exam")
        }
    }, [isError])

    if (isLoading) {
        return <Loading />
    }



    return <>
        <div className="container">
            <div class="card">
                <div class="card-header bg-primary text-light fs-4 text-center">Exam Paper</div>
                <div class="card-body">
                    <div className="container">
                        <div class="card">
                            {currentQuestion && (
                                <div className="card-body p-5">
                                    <h5>Q{currentQuestionIndex + 1}. {currentQuestion.question}</h5>
                                    {currentQuestion.options.map((item, i) => (

                                        <div className="form-check" key={i}>
                                            <input
                                                onChange={(e) => handleOptionSelect(e.target.value)}
                                                className="form-check-input"
                                                type="radio"
                                                value={item}
                                                name={`question-${currentQuestion._id}`}
                                                checked={answer.some(a => a.questionId === currentQuestion._id && a.selectedOption === item)}
                                                id={`options-${i}`}
                                            />
                                            <label className="form-check-label">
                                                {item}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className='d-flex justify-content-between align-item-center m-3 '>
                                <button disabled={currentQuestionIndex === 0} onClick={e => setCurrentQuestionIndex(currentQuestionIndex - 1)} type="button" class="btn btn-primary"><i class="bi bi-chevron-double-left"></i> Previous</button>
                                <button disabled={currentQuestionIndex === paperData.length - 1} onClick={e => setCurrentQuestionIndex(currentQuestionIndex + 1)} type="button" class="btn btn-primary">Next <i class="bi bi-chevron-double-right"></i></button>
                            </div>
                        </div>
                        <div className='text-center'>
                            <button onClick={handleSubmit} type="submit" class="btn btn-primary w-50  mt-3">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default UserExam