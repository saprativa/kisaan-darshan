import React, {useContext} from 'react'
import {AuthContext} from '../context/AuthContext'

const Profile = () => {
    const {user} = useContext(AuthContext)
    return (
        <h1>Profile of {user} </h1>
    )
}

export default Profile