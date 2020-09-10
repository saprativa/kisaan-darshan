import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import { Input, FormFeedback, FormGroup } from 'reactstrap'
import Alert from 'react-bootstrap/Alert'
import classnames from 'classnames'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const schema = yup.object().shape({
  name: yup.string().required("Please enter Crop Name."),
  rate: yup.string().required("Please enter Rate.")
})

export default function Crops() {

  const { register, handleSubmit, errors, setError, watch } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema)
  })

  const watchAllFields = watch()
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);

  

  const handleShow = () => {
      setShow(true);
  }

  const handleClose = () => {
      setShow(false);
  }

  const onSubmit = data => {
    axios.post('/api/crop', data)
    .then((response) => {
      setShow(false)
    })
    .catch((error) => {
      setError("server", {type: "manual", message: "Invalid Crop Data."})
      setShowAlert(true)
    })
  }

  return (

    <div>
        <Button variant="primary" onClick={handleShow}>
                Add Crop
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Crop</Modal.Title>
            </Modal.Header>

            <Modal.Body>

              <form onSubmit={handleSubmit(onSubmit)}>
              
                {
                    errors.server?
                    <Alert variant="danger" show={showAlert} dismissible onClose={() => setShowAlert(false)}>
                    {errors.server?.message}
                    </Alert>
                    :
                    <p></p>
                }
                
                <FormGroup>
                    <Input type="text" name="name" placeholder="Crop Name" innerRef={register} 
                    className={classnames({'is-invalid': errors.name, 
                    'is-valid': watchAllFields.name && !errors.name})} />
                    <FormFeedback>{errors.name?.message}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="rate" placeholder="Rate" innerRef={register} 
                    className={classnames({'is-invalid': errors.rate, 
                    'is-valid': watchAllFields.rate && !errors.rate})} />
                    <FormFeedback>{errors.rate?.message}</FormFeedback>
                </FormGroup>

              </form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                  Cancel
              </Button>
              <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                  Add Crop
              </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}