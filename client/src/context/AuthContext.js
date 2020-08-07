import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        axios.get('/api/auth')
        .then((response) => {
            if(response.status !== 401) {
                setIsLoading(true)
                setIsAuthenticated(true)
                setUser(response.data.firstName + " " + response.data.lastName)
                setProfile(response.data)
            }
        })
        .catch((error) => {
            setIsLoading(true)
        })
    }, [])

    return(
        <div>
            {!isLoading? <h1>Loading</h1> :
                <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated, profile, setProfile}}>
                    { children }
                </AuthContext.Provider>
            }
        </div>
    )
}

export {AuthContext, AuthContextProvider}