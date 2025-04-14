import React, { useEffect } from 'react'
import Lottie from "lottie-react"
import successAnimation from '../assets/success.json'
import successMusic from '../assets/success.mp3'
import { useNavigate } from 'react-router-dom'
import { useUserLogoutMutation } from '../../redux/api/auth.api'


const Success = () => {

    const [logout] = useUserLogoutMutation()

    const navigate = useNavigate()

    setTimeout(() => {
        logout()
        navigate("/")
    }, 5000)

    useEffect(() => {
        const audio = new Audio(successMusic)
        audio.play()
        return () => {
            audio.pause()
        }
    }, [])

    return <div className='d-flex justify-content-center flex-column align-items-center'>
        <div style={{ height: 400, width: 400 }}>
            <Lottie animationData={successAnimation} loop={true} />
        </div>
    </div>
}

export default Success