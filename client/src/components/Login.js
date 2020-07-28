import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import './Login.css'

const schema = yup.object().shape({
  mobile: yup.string().required("Please enter Mobile Number."),
  password: yup.string().required("Please enter Password.")
})

export default function Login() {
  const [login, setLogin] = useState(false)
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = data => {
    axios.post('/login', data)
    .then((response) => {
      console.log(response.data)
      if (!response.data.success) {
        setLogin(true);
        console.log(login)
      }
    })
  }

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
    
      <input type="text" name="mobile" placeholder="Mobile Number" ref={register} />
      <p className="error">{errors.mobile?.message}</p>
        
      <input type="password" name="password" placeholder="Password" ref={register} />
      <p className="error">{errors.password?.message}</p>
      
      <input type="submit" value="Login" />
    </form>
  )
}