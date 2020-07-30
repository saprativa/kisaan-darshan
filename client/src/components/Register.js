import React from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import './Login.css'

const schema = yup.object().shape({
  firstName: yup.string().required("Please enter First Name."),
  lastName: yup.string().required("Please enter Last Name."),
  age: yup.string().required("Please enter Age."),
  sex: yup.string().required("Please enter Sex."),
  mobile: yup.string().required("Please enter Mobile Number."),
  email: yup.string().email("Please enter a valid Email."),
  village: yup.string().required("Please enter Village."),
  block: yup.string().required("Please enter Block."),
  district: yup.string().required("Please enter District."),
  state: yup.string().required("Please enter State."),
  password: yup.string().required("Please enter Password.")
})

export default function Register() {

  const { register, handleSubmit, errors, setError } = useForm({
    resolver: yupResolver(schema)
  })

  const history = useHistory();

  const onSubmit = data => {
    axios.post('/register', data)
    .then((response) => {
      if(response.data.errors) {
        response.data.errors.forEach(element => {
          setError(element.param, {type: "server", message: element.msg})
        })
      }
      if (response.data.success) {
        history.push("/login")
      }
      if(response.data.exists)
        setError("server", {type: "manual", message: "User already exists!"})
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