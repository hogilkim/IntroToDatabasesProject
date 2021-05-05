import React, {useState} from 'react';
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async evt=>{
      evt.preventDefault();
      console.log('result of submit', email, password);
    }

    return (
      <Container>
        <h2>Login:</h2>
        <p>Please<strong>Login</strong> to your account</p>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="cs3083@nyu.edu" onChange={evt=>setEmail(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassword" className="mr-sm-2">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={evt=>setPassword(evt.target.value)}/>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Container>
      );
}