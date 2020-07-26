import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    render() {
      return (
        <div className="container">
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="Password" />
            </FormGroup>
            <Button>Submit</Button>
          </Form>
        </div>
      )
    }
  }
  
  export default Login