import React, {useContext} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from "react-router-dom"
import axios from 'axios'

function Secret() {

  const {setIsAuthenticated, setUser, user, isAuthenticated} = useContext(AuthContext)
  const history = useHistory()
  console.log('Secret')
  console.log(user)
  console.log(isAuthenticated)

  const logoutHandler = () => {
    axios.get('/api/logout')
    .then((response) => {
      if (response.data.success) {
        setIsAuthenticated(false)
        setUser(null)
        history.push("/login")
      } 
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <h1>Secret</h1>
      <button type="submit" value="Logout" onClick={logoutHandler}>Logout</button>
    </div>
  )
}

export default Secret