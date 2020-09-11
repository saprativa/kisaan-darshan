import React from 'react'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom"

function Dashboard() {

  return (
    <div className="mt-5">
      <CardDeck>

        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
          <Card.Img variant="top" src="./images/dashboard/farmer/crop.jpg" />
          <Card.Body>
            <Card.Title>Crops</Card.Title>
            <Card.Text>
              Manage all your crops.
            </Card.Text>
              <Link to="/crops">
                <Button variant="primary">Add/Remove Crops</Button>
              </Link>
          </Card.Body>
        </Card>

        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
          <Card.Img variant="top" src="./images/dashboard/farmer/farmMachinery.jpg" />
          <Card.Body>
            <Card.Title>Farm Machinery</Card.Title>
            <Card.Text>
              Manage all your farm machinery.
            </Card.Text>
            <Button variant="primary">Add/Remove Farm Machinery</Button>
          </Card.Body>
        </Card>

        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
          <Card.Img variant="top" src="./images/dashboard/farmer/farmLand.jpg" />
          <Card.Body>
            <Card.Title>Farm Land</Card.Title>
            <Card.Text>
              Manage all your farm land.
            </Card.Text>
            <Button variant="primary">Add/Remove Farm Land</Button>
          </Card.Body>
        </Card>

        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
          <Card.Img variant="top" src="./images/dashboard/farmer/irrigation.jpg" />
          <Card.Body>
            <Card.Title>Irrigation</Card.Title>
            <Card.Text>
              Manage all your irrigation.
            </Card.Text>
            <Button variant="primary">Add/Remove Irrigation</Button>
          </Card.Body>
        </Card>

        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
          <Card.Img variant="top" src="./images/dashboard/farmer/cropInsurance.jpg" />
          <Card.Body>
            <Card.Title>Crop Insurance</Card.Title>
            <Card.Text>
              Manage all your crop insurance.
            </Card.Text>
            <Button variant="primary">Add/Remove Crop Insurance</Button>
          </Card.Body>
        </Card>

        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
          <Card.Img variant="top" src="./images/dashboard/farmer/kcc.jpg" />
          <Card.Body>
            <Card.Title>Kisan Credit Card</Card.Title>
            <Card.Text>
              Manage all your KCC.
            </Card.Text>
            <Button variant="primary">Add/Remove KCC</Button>
          </Card.Body>
        </Card>

        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
          <Card.Img variant="top" src="./images/dashboard/farmer/farmLoan.jpg" />
          <Card.Body>
            <Card.Title>Farm Loan</Card.Title>
            <Card.Text>
              Manage all your farm loan.
            </Card.Text>
            <Button variant="primary">Add/Remove Farm Loan</Button>
          </Card.Body>
        </Card>

        <Card style={{ minWidth: '18rem', maxWidth: '18rem' }} className="mb-3">
          <Card.Img variant="top" src="./images/dashboard/farmer/chemicalFertilizers.jpg" />
          <Card.Body>
            <Card.Title>Chemical Fertilizers</Card.Title>
            <Card.Text>
              Manage all your fertilizers.
            </Card.Text>
            <Button variant="primary">Add/Remove Fertilizers</Button>
          </Card.Body>
        </Card>
       
        
      </CardDeck>
    </div>
  )
}

export default Dashboard