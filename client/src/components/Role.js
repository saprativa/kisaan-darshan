import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import './styles.css'
import axios from 'axios'
import { useHistory } from "react-router-dom";

export default function Role() {

    const history = useHistory()

    const setRoleFarmer = () => {
        axios.post('/api/role', {role: 'farmer'})
        .then((response) => {
            history.push("/dashboard")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const setRoleVendor = () => {
        axios.post('/api/role', {role: 'vendor'})
        .then((response) => {
            history.push("/dashboard")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    const setRoleCustomer = () => {
        axios.post('/api/role', {role: 'customer'})
        .then((response) => {
            history.push("/dashboard")
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <Container className="roleContainer">
            <Row>
                <Col>
                    <Image src="./images/role/farmer.png" onClick={setRoleFarmer} roundedCircle />
                </Col>
                <Col>
                    <Image src="./images/role/vendor.png" onClick={setRoleVendor} roundedCircle />
                </Col>
                <Col>
                    <Image src="./images/role/customer.png" onClick={setRoleCustomer} roundedCircle />
                </Col>
            </Row>
        </Container>
    )
}