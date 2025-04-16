import React from 'react'
import { useGetUsersResultsQuery } from '../../redux/api/exam.api'

const UserResults = () => {

    const { data } = useGetUsersResultsQuery()
    console.log(data)


    return <>
        {
            data && data.userResult.map(item => <div class="card">
                <div class="card-header">
                    {item.userName}
                    <img className='rounded ms-5' src={item.userImage} alt={item.userImage} height={60} />
                </div>
                <div class="card-body">
                    {
                        item.answers.map(ans => <p>
                            {ans.question}
                            {ans.selectedOption}
                        </p>)
                    }
                </div>
            </div>)
        }
    </>
}

export default UserResults