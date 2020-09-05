import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import './styles.css'
import { Link } from "react-router-dom"

export default function Role() {

    return (
        <Container className="roleContainer">
            <Row>
                <Col>
                    <Link 
                        to={{
                            pathname: "/register",
                            state: { role: "farmer" }
                          }}
                    >
                        <Image src="./images/role/farmer.png" roundedCircle />
                    </Link>
                </Col>
                <Col>
                    <Link 
                        to={{
                            pathname: "/register",
                            state: { role: "vendor" }
                        }}
                    >
                        <Image src="./images/role/vendor.png" roundedCircle />
                    </Link>
                </Col>
                <Col>
                    <Link 
                        to={{
                            pathname: "/register",
                            state: { role: "customer" }
                        }}
                    >
                        <Image src="./images/role/customer.png" roundedCircle />
                    </Link>
                </Col>
            </Row>
        </Container>
    )
}