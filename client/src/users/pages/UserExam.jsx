import React, { useEffect, useState } from 'react'
import { useLazyGetPaperQuery } from '../../redux/api/exam.api'

const UserExam = () => {

    const [paperData, setPaperData] = useState([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
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
                                                className="form-check-input"
                                                type="radio"
                                                name={`question- ${currentQuestion}`}
                                                id={`options-${i}`}
                                            />
                                            <label className="form-check-label">
                                                {item}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className='d-flex justify-content-between align-item-center m-3'>
                            <button disabled={currentQuestionIndex === 0} onClick={e => setCurrentQuestionIndex(currentQuestionIndex - 1)} type="button" class="btn btn-primary"><i class="bi bi-chevron-double-left"></i> Previous</button>
                            <button disabled={currentQuestionIndex === paperData.length - 1} onClick={e => setCurrentQuestionIndex(currentQuestionIndex + 1)} type="button" class="btn btn-primary">Next <i class="bi bi-chevron-double-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default UserExam