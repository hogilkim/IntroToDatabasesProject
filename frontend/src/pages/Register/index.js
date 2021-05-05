import React, {useState} from 'react';
import api from '../../services/api'
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';


export default function Register( {history} ){
    const [customer_name, setCustomerName] = useState("") 
    const [customer_email, setEmail] = useState("")
    const [customer_password, setPassword] = useState("")
    const [building_number, setBuildingNumber] = useState("")
    const [street, setStreet] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [customer_phone_number, setCustomerPhoneNumber] = useState("")
    const [passport_number, setPassportNumber] = useState("")//!
    const [passport_expiration, setPassportExpiration] = useState("")
    const [passport_country, setPassportCountry] = useState("")
    const [date_of_birth, setDate] = useState("")
    
    const handleSubmit = async evt=>{
      evt.preventDefault();
      console.log('result of submit', customer_name, customer_email, customer_password, building_number, street,
      city, state, customer_phone_number, passport_number, passport_expiration, passport_country, date_of_birth);

      const response = await api.post('/user/customer/register',{ customer_name, customer_email, customer_password, building_number, street,
        city, state, customer_phone_number, passport_number, passport_expiration, passport_country, date_of_birth});


      const customer_email_address = response.data.customer_email || false;
      console.log("email:", customer_email_address);

      if (customer_email_address){
        history.push('/login')
      } else {
        const {message} = response.data;
        console.log(message);
      }
    }

    return (
      <Container>
        <h2>Customer Register:</h2>
        <p>Please<strong>Login</strong> to your account</p>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleName" className="mr-sm-2">Name</Label>
            <Input type="text" name="email" id="exampleName" placeholder="Your Name" onChange={evt=>setCustomerName(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleEmail" className="mr-sm-2">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="cs3083@nyu.edu" onChange={evt=>setEmail(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassword" className="mr-sm-2">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Password" onChange={evt=>setPassword(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleBuildingNumber" className="mr-sm-2">Building Number</Label>
            <Input type="text" name="text" id="exampleBuildingNumber" placeholder="Building Number" onChange={evt=>setBuildingNumber(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleStreet" className="mr-sm-2">Street</Label>
            <Input type="text" name="text" id="exampleStreet" placeholder="Jay St." onChange={evt=>setStreet(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleCity" className="mr-sm-2">City</Label>
            <Input type="text" name="text" id="exampleCity" placeholder="New York" onChange={evt=>setCity(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleState" className="mr-sm-2">State</Label>
            <Input type="text" name="text" id="exampleState" placeholder="NY" onChange={evt=>setState(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePhone" className="mr-sm-2">Phone Number</Label>
            <Input type="text" name="text" id="examplePhone" placeholder="123-456-7890" onChange={evt=>setCustomerPhoneNumber(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassportNumber" className="mr-sm-2">Passport Number</Label>
            <Input type="text" name="text" id="examplePassportNumber" placeholder="Your Passport Num" onChange={evt=>setPassportNumber(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleExpirationDate" className="mr-sm-2">Passport Expiration Date</Label>
            <Input type="date" name="date" id="exampleExpirationDate" placeholder="Your Expiration Date" onChange={evt=>setPassportExpiration(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="examplePassportCountry" className="mr-sm-2">Passport Country</Label>
            <Input type="text" name="text" id="examplePassportCountry" placeholder="US" onChange={evt=>setPassportCountry(evt.target.value)}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="exampleBirthDate" className="mr-sm-2">Date of Birth</Label>
            <Input type="date" name="date" id="exampleBirthDate" placeholder="" onChange={evt=>setDate(evt.target.value)}/>
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Container>
      );
}