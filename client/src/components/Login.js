import React from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import './Login.css'

const schema = yup.object().shape({
  mobile: yup.string().required("Please enter Mobile Number."),
  password: yup.string().required("Please enter Password.")
})

export default function Login() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  })
  const onSubmit = data => {
    fetch('/login')
    .then(response => response.json())
    .then(data => console.log(data));
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