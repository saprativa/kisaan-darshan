import React, { useContext } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import './styles.css'
import { AuthContext } from '../context/AuthContext'
import { Input, FormFeedback, FormGroup, Alert } from 'reactstrap'
import classnames from 'classnames'

const schema = yup.object().shape({
  mobile: yup.string().required("Please enter Mobile Number.").min(10, "Invalid Mobile Number.").max(10, "Invalid Mobile Number."),
  password: yup.string().required("Please enter Password.").min(5, "Minimum 5 characters.")
})

export default function Login() {

  const { register, handleSubmit, errors, setError, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const watchAllFields = watch();

  const {setIsAuthenticated, setUser, setProfile} = useContext(AuthContext)

  const history = useHistory()

  const onSubmit = data => {
    axios.post('/api/login', data)
    .then((response) => {
      if (response.data.success) {
        setIsAuthenticated(true)
        setUser(response.data.user)
        setProfile(response.data.profile)
        history.push("/dashboard")
      } 
    })
    .catch((error) => {
      setError("server", {type: "manual", message: "Invalid Mobile Number/Password."})
    })
  }

  return (

    <div className="outer">
     
    <form onSubmit={handleSubmit(onSubmit)}>
      
      {
        errors.server?
        <Alert color="danger">
          {errors.server?.message}
        </Alert>
        :
        <p></p>
      }
      
      
      <FormGroup>
        <Input type="text" name="mobile" placeholder="Mobile Number" innerRef={register} 
        className={classnames({'is-invalid': errors.mobile, 'is-valid': watchAllFields.mobile && !errors.mobile})} />
        <FormFeedback>{errors.mobile?.message}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Input type="password" name="password" placeholder="Password" innerRef={register} 
        className={classnames({'is-invalid': errors.password, 'is-valid': watchAllFields.password && !errors.password})} />
        <FormFeedback>{errors.password?.message}</FormFeedback>
      </FormGroup>
      
      <input type="submit" value="Login" />
    </form>

    </div>
  )
}