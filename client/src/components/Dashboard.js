import React from 'react'
import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button'

function Dashboard() {

  return (
    <div className="mt-5">
      <Link to="/crops">
        <Button variant="primary">Crops</Button>
      </Link>
    </div>
  )
}

export default Dashboard