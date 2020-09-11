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
  date: yup.string().required("Please enter Date."),
  area: yup.string().required("Please enter Area."),
  unit: yup.string().required("Please enter Unit."),
  sell: yup.string().required("Please enter Sell."),
  buy: yup.string().required("Please enter Buy."),
  rate: yup.string().required("Please enter Rate."),
  variety: yup.string().required("Please enter Variety."),
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
                <Card.Img variant="top" src="./images/crops/na.png" />
                <Card.Body>
                  <Card.Title>{crop.name}</Card.Title>
                  <Card.Text>
                    Date of sowing: {crop.date} <br />
                    Area: {crop.area} <br />
                    Unit: {crop.unit} <br />
                    Sell: {crop.sell} <br />
                    Buy: {crop.buy} <br />
                    Rate: {crop.rate} <br />
                    Variety: {crop.variety} <br />
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
                    <Input type="text" name="date" placeholder="Date of sowing" innerRef={register} 
                    className={classnames({'is-invalid': errors.date, 
                    'is-valid': watchAllFields.date && !errors.date})} />
                    <FormFeedback>{errors.date?.message}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="area" placeholder="Area in which sown" innerRef={register} 
                    className={classnames({'is-invalid': errors.area, 
                    'is-valid': watchAllFields.area && !errors.area})} />
                    <FormFeedback>{errors.area?.message}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="unit" placeholder="Unit" innerRef={register} 
                    className={classnames({'is-invalid': errors.unit, 
                    'is-valid': watchAllFields.unit && !errors.unit})} />
                    <FormFeedback>{errors.unit?.message}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="sell" placeholder="Sell" innerRef={register} 
                    className={classnames({'is-invalid': errors.sell, 
                    'is-valid': watchAllFields.sell && !errors.sell})} />
                    <FormFeedback>{errors.sell?.message}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="buy" placeholder="Buy" innerRef={register} 
                    className={classnames({'is-invalid': errors.buy, 
                    'is-valid': watchAllFields.buy && !errors.buy})} />
                    <FormFeedback>{errors.buy?.message}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="rate" placeholder="Rate" innerRef={register} 
                    className={classnames({'is-invalid': errors.rate, 
                    'is-valid': watchAllFields.rate && !errors.rate})} />
                    <FormFeedback>{errors.rate?.message}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input type="text" name="variety" placeholder="Variety" innerRef={register} 
                    className={classnames({'is-invalid': errors.variety, 
                    'is-valid': watchAllFields.variety && !errors.variety})} />
                    <FormFeedback>{errors.variety?.message}</FormFeedback>
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