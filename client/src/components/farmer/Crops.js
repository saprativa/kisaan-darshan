import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers'
import * as yup from "yup"
import axios from 'axios'
import { Input, FormFeedback, FormGroup } from 'reactstrap'
import Alert from 'react-bootstrap/Alert'
import classnames from 'classnames'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'

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
  const [crops,setCrops] = useState([]);

  useEffect(() => {
    axios.get('/api/crops')
    .then((response) => {
      setCrops(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [])

  const handleShow = () => {
      setShow(true);
  }

  const handleClose = () => {
      setShow(false);
  }

  const onSubmit = data => {
    axios.post('/api/crop', data)
    .then((response) => {
      if(response.data.success) {
        setShow(false)
        axios.get('/api/crops')
        .then((response) => {
          setCrops(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    })
    .catch((error) => {
      setError("server", {type: "manual", message: "Invalid Crop Data."})
      setShowAlert(true)
    })
  }

  return (

    <div className="mt-5">
        <Button variant="primary" onClick={handleShow}>
                Add Crop
        </Button>

        <CardDeck className="mt-3">
        {
          crops.map(crop => {
            return(
              <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
                <Card.Body>
                  <Card.Title>{crop.name}</Card.Title>
                  <Card.Text>
                    {crop.rate}
                  </Card.Text>
                  <Button variant="success">Edit</Button>
                </Card.Body>
              </Card>
            )
          })
        }
        </CardDeck>

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