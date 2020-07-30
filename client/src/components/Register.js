import React from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import './Login.css'

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter First Name."),
  
})

export default function Register() {

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema)
  })

  const history = useHistory();

  const onSubmit = data => {
    axios.post('/register', data)
    .then((response) => {
      console.log()
      response.data.errors.forEach(element => {
        setError(element.param, {type: "server", message: element.msg})
      });
      //setError(response.data.errors[0].param, {type: "server", message: response.data.errors[0].msg})
      if (response.data.success) {
       // history.push("/login")
      } else {
        //setError("server", {type: "manual", message: "Invalid Mobile Number/Password."})
      }
    })
  }

  return (
     
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>

      <p className="error">{errors.server?.message}</p>
      
      <input type="text" name="firstName" placeholder="First Name" ref={register} />
      <p className="error">{errors.firstName?.message}</p>

      <input type="text" name="lastName" placeholder="Last Name" ref={register} />
      <p className="error">{errors.lastName?.message}</p>

      <input type="text" name="age" placeholder="Age" ref={register} />
      <p className="error">{errors.age?.message}</p>

      <input type="text" name="sex" placeholder="Sex" ref={register} />
      <p className="error">{errors.sex?.message}</p>

      <input type="text" name="mobile" placeholder="Mobile Number" ref={register} />
      <p className="error">{errors.mobile?.message}</p>

      <input type="text" name="email" placeholder="Email (optional)" ref={register} />
      <p className="error">{errors.email?.message}</p>

      <input type="text" name="village" placeholder="Village" ref={register} />
      <p className="error">{errors.village?.message}</p>

      <input type="text" name="block" placeholder="Block" ref={register} />
      <p className="error">{errors.block?.message}</p>

      <input type="text" name="district" placeholder="District" ref={register} />
      <p className="error">{errors.district?.message}</p>

      <input type="text" name="state" placeholder="State" ref={register} />
      <p className="error">{errors.state?.message}</p>
        
      <input type="password" name="password" placeholder="Password" ref={register} />
      <p className="error">{errors.password?.message}</p>
      
      <input type="submit" value="Register" />
    </form>
  )
}