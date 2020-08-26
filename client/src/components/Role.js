import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import './styles.css'

export default function Role() {
    return (
        <Container className="role">
            <Row className="abc">
                <Col className="fill">
                    <Image src="./images/role/sample.png" rounded />
                </Col>
                <Col className="fill">
                    <Image src="./images/role/sample.png" roundedCircle />
                </Col>
                <Col className="fill">
                    <Image src="./images/role/sample.png" rounded />
                </Col>
            </Row>
        </Container>
    )
}