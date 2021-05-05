import React, {useState} from 'react';
import api from '../../services/api'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default function Login(){
    // const [email, setEmail] = 

    return (
        <Form>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="cs3083@nyu.edu" />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassword" className="mr-sm-2">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      );
}