import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, remove } from './userSlice'
import { useEffect, useState, useCallback } from 'react'


import { Row, Col, Container, Card, CardTitle, Button, CardText, CardLink, Spinner,
Modal, ModalBody, ModalFooter, ModalHeader
} from 'reactstrap';

import {
  Link, useParams, useLocation
} from "react-router-dom";
import { Outlet } from "react-router-dom";
import {useGetAllUsersQuery} from './../api/apiSlice';
import  ModalProvider  from '../modals/modalContext'
import  ModalService  from './../modals/ModalService';
import { useModalDispatch} from '../modals/modalContext'

export default function UserLists() {
    const dispatch = useDispatch();
    const [selectedUser, setSelectedUser] = useState(null);
    const dispatchModal = useModalDispatch();
    const removeUser = () => dispatch(remove({id: selectedUser}));
    let userAll = useSelector((state) => state.user.data);
    const spinner = <Spinner color="primary">Loading...</Spinner>
    const handleModal = (id) => {
      setSelectedUser(id)
      const modal = {
        title: 'Delete User',
        body: 'Are you sure you want to delete this user?',
        btnLeft: "Delete",
        btnRight: "Cancel",
      }
      dispatchModal.open(modal);
    }


    //RTK
    let {
      data: users,
      isLoading,
      isSuccess,
      isError,
      error
    } = useGetAllUsersQuery();
    if(localStorage.getItem('fetchOnce') !== null) {
      users = userAll;
    }
    else {
      localStorage.setItem('fetchOnce', 'true');
      dispatch(fetchUsers());
    }
    let content;
    
    if(isLoading) {
      content = <Col md='12'>{spinner}</Col>;
    }
    else if (isError) {
      content = <Col md='12'>{'There is an Error while fetching.'}</Col>;
    }
    else {
      content = users.map((user) => (
        <Col sm="3" key={user.id}>
          <Card body>
            <CardTitle tag="h5">
              {user.name} ({user.email})
            </CardTitle>
            <CardText>
              Company: {user.company.name}<br/>
              City: {user.address.city}

            </CardText>
            <div className={{display: 'flex'}}>
              <Link to={'/users/edit/' + user.id} class="btn btn-primary">Edit</Link>&nbsp;
              {/* <Link to="/users" class="btn btn-danger">Remove</Link> */}
              <Button color="danger" onClick={() => handleModal(user.id)}>Remove</Button>
            </div>
          </Card>
        </Col>
      ));
    }
    
  return (
    <Container className='text-center'>
      <Row>
        {content}
      </Row>      
      <ModalService callback={removeUser}/>
    </Container>
  )
}