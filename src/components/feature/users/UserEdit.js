import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom'
import { update } from './userSlice';
import {
  Link
} from "react-router-dom";
import { Col, Container, Form, Row, Label, FormGroup, Button, Input } from 'reactstrap';


export default function UserEdit() {
  let key;
  const {id} = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userStore] = useSelector((state) => state.user.data.filter(user => user.id == id));
  
  const [user, setUser] = useState(userStore);
  const userHandle = (e) => {
    if (e.target.name.indexOf('address') !== -1 || e.target.name.indexOf('company') !== -1) {
      key = (e.target.name).toString().substr(8);

      if (e.target.name.indexOf('address') !== -1) {
        if (key == 'lat' || key == 'lng') {
          setUser((user) => (
            {
              ...user,
              address : {
                ...user.address,
                geo: {...user.address.geo, [key]: e.target.value}
              }
            }
          ))
        }
        else {
          setUser((user) => (
            {
              ...user,
              address: {...user.address, [key]: e.target.value}
            }
          ))
        }
        
      }


      if (e.target.name.indexOf('company') !== -1) {
        setUser((user) => (
          {
            ...user,
            company: {...user.company, [key]: e.target.value}
          }
        ))
      }
    }
    else {
      setUser((user) => ({...user, [e.target.name]: e.target.value}))
    }
  }
  const submitForm = (e) => {
    e.preventDefault();
    console.log(user);
    dispatch(update(user));
    navigate("/users?update=true");
  }
  return (
    <Container>
      <Row>
        <Col md='12'>
        <Form onSubmit={submitForm}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleName">
                    Name
                  </Label>
                  <Input
                    id="exampleName"
                    name="name"
                    defaultValue={user.name}
                    onChange={userHandle}
                    placeholder="Name placeholder"
                    type="text"
                  />
                </FormGroup>
                
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">
                    Email
                  </Label>
                  <Input
                    id="exampleEmail"
                    name="email"
                    defaultValue={user.email}
                    onChange={userHandle} 
                    placeholder="with a placeholder"
                    type="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleCompany">
                Company
              </Label>
              <Input
                id="exampleCompany"
                name="company.name"
                defaultValue={user.company.name}
                onChange={userHandle}
                placeholder="Company"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleAddress">
                Address Street
              </Label>
              <Input
                id="exampleAddress"
                name="address.street"
                defaultValue={user.address.street}
                onChange={userHandle}
                placeholder="1234 Main St"
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleAddress2">
                Address Suite
              </Label>
              <Input
                id="exampleAddress2"
                name="address.suite"
                defaultValue={user.address.suite}
                onChange={userHandle}
                placeholder="Apartment, studio, or floor"
              />
            </FormGroup>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleCity">
                    City
                  </Label>
                  <Input
                    id="exampleCity"
                    name="address.city"
                    defaultValue={user.address.city}
                    onChange={userHandle}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="exampleLat">
                    Lat
                  </Label>
                  <Input
                    type='number'
                    id="exampleLat"
                    name="address.lat"
                    defaultValue={user.address.geo.lat}
                    onChange={userHandle}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="examplelong">
                    Long
                  </Label>
                  <Input
                    type='number'
                    id="examplelong"
                    name="address.lng"
                    defaultValue={user.address.geo.lng}
                    onChange={userHandle}
                  />
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup>
                  <Label for="exampleZip">
                    Zip
                  </Label>
                  <Input
                    id="exampleZip"
                    name="address.zipcode"
                    type='number'
                    min="9000"
                    max="9999"
                    defaultValue={parseInt(user.address.zipcode)}
                    onChange={userHandle}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color='primary'>
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}
