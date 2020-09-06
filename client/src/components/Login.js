import React, { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useHistory } from "react-router-dom";
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import './styles.css'
import { AuthContext } from '../context/AuthContext'
import { Input, FormFeedback, FormGroup, Button } from 'reactstrap'
import Alert from 'react-bootstrap/Alert'
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

  const {isAuthenticated, setIsAuthenticated, setUser} = useContext(AuthContext)

  const history = useHistory()

  const [show, setShow] = useState(false);

  const onSubmit = data => {
    axios.post('/api/login', data)
    .then((response) => {
      if (response.data.success) {
        setIsAuthenticated(true)
        setUser(response.data.user)
        history.push("/dashboard")
      } 
    })
    .catch((error) => {
      setError("server", {type: "manual", message: "Invalid Mobile Number/Password."})
      setShow(true)
    })
  }

  return (

    <div className="outer">
      {
        isAuthenticated
        ?
        <Alert variant="danger">
          You are already logged in. Please logout to login as a different user.
        </Alert>
        :
        <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
          
          {
            errors.server?
            <Alert variant="danger" show={show} dismissible onClose={() => setShow(false)}>
              {errors.server?.message}
            </Alert>
            :
            <p></p>
          }
          
          <FormGroup>
            <Input type="text" name="mobile" placeholder="Mobile Number" innerRef={register} 
            className={classnames({'is-invalid': errors.mobile, 
            'is-valid': watchAllFields.mobile && !errors.mobile})} />
            <FormFeedback>{errors.mobile?.message}</FormFeedback>
          </FormGroup>

          <FormGroup>
            <Input type="password" name="password" placeholder="Password" innerRef={register} 
            className={classnames({'is-invalid': errors.password, 'is-valid': watchAllFields.password && !errors.password})} />
            <FormFeedback>{errors.password?.message}</FormFeedback>
          </FormGroup>

          <Button>Login</Button>
        </form>
      }
    </div>
  )
}