import React from 'react'

const Practice = () => {

    const { data: examTime } = useGetExamTimeQuery()


    const formatTime = (time) => {
        const hours = time.getHours();
        const minutes = time.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        return `${hours % 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    }

    // const startTimeFormatted = examTime ? formatTime(new Date(examTime.startTime)) : 'Loading time...';

    const startTimeFormatted = examTime?.startTime ? formatTime(new Date(examTime.startTime)) : 'Loading time...';


    return <>
        <h1>{startTimeFormatted}</h1>
    </>
}

export default Practice