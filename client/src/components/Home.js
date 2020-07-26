import React, {Component} from 'react'
import { Jumbotron, Button } from 'reactstrap'

class Home extends Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1 className="display-3">Welcome to Kisaan Darshan</h1>
          <p className="lead">
            Farmers leading the world of agricultural ecosystem through Kisaan Darshan where all 
            stockholders of agriculture viz. investors, markets, consumers, intellectuals &amp; 
            professionals along with government entities interacts freely center to farmers and 
            farming community.
          </p>
          <hr className="my-2" />
          <p>
            Kisaan Darshan enables farmers to lead the world of agricultural systems. Here all the 
            stakeholders viz. investors, markets, consumers, intellectuals &amp; professionals along with
             government entities interact freely with respect to farmers and farming communities.
          </p>
          <p className="lead">
            <Button color="primary">Login</Button>
          </p>
        </Jumbotron>
      </div>
    )
  }
}

export default Home