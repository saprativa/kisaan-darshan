import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        axios.get('/api/auth')
        .then((response) => {
            if(response.status !== 401) {
                setIsLoading(true)
                setIsAuthenticated(true)
                setUser(response.data.firstName + " " + response.data.lastName)
            }
        })
        .catch((error) => {
            setIsLoading(true)
        })
    }, [])

    return(
        <div>
            {!isLoading? <h1>Loading</h1> :
                <AuthContext.Provider value={{user, setUser, isAuthenticated, setIsAuthenticated}}>
                    { children }
                </AuthContext.Provider>
            }
        </div>
    )
}

export {AuthContext, AuthContextProvider}