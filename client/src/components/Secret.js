import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';


function Secret() {

 const[user, setUser] = useState()
 const history = useHistory()
 
  useEffect(() => {
    axios.get('/api/auth', {
      headers: {Authorization: "Bearer " + localStorage.getItem("token")},
    })
    .then((response) => {
      setUser(response.data)
    })
    .catch((error) => {
      history.push('/login')
    })
  }, [])

  return (
    <div>
      <h1>Secret</h1>
      <p>{JSON.stringify(user, null, 2)}</p>
    </div>
  )
}

export default Secret