import React from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import './Login.css'

const schema = yup.object().shape({
  mobile: yup.string().required("Please enter Mobile Number."),
  password: yup.string().required("Please enter Password.")
})

export default function Login() {

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema)
  })

  const history = useHistory()

  const onSubmit = data => {
    axios.post('/login', data)
    .then((response) => {
      if (response.data.success) {
        history.push("/")
      } 
    })
    .catch((error) => {
      setError("server", {type: "manual", message: "Invalid Mobile Number/Password."})
    })
  }

  return (
     
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

      <p className="error">{errors.server?.message}</p>
      
      <input type="text" name="mobile" placeholder="Mobile Number" ref={register} />
      <p className="error">{errors.mobile?.message}</p>
        
      <input type="password" name="password" placeholder="Password" ref={register} />
      <p className="error">{errors.password?.message}</p>
      
      <input type="submit" value="Login" />
    </form>
  )
}