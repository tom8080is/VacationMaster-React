
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AppState } from "../../redux/app-state";
import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { Avatar } from "@material-ui/core";
import "./Header.css";
import { ActionType } from "../../redux/action-type";
function Header() {
 const history=useHistory()
 const dispatch = useDispatch();
 let user = useSelector((state: AppState) => state.user);


  function logout (){
    localStorage.removeItem('token');
    history.push(`/login`);
    dispatch({ type: ActionType.getUser, payload:  {userType:'' , username:''} });
  }
  let userType = user.userType
  let username = user.username;
  let usernameTwoLetters  = username.charAt(0)+ username.charAt(1);




  return (
    <div>
       <div className='logoCon' >
       <div className='logo' ></div>
       </div>


  <Navbar fixed='top' bg="light" variant="light">
    <Container>
    <Navbar.Brand><img src="https://tinyurl.com/srkeur63" width='110px' alt="" /></Navbar.Brand>
    <Nav className="me-auto">
    {userType === "ADMIN" && (
      <Nav.Link className='link' href="/admin">Home</Nav.Link> )}
    {userType === "ADMIN" && (
      <Nav.Link className='link' href="/admin/addvacation">Add Vacation</Nav.Link> )}
          {userType === "ADMIN" && (
      <Nav.Link className='link' href="/chart">Charts</Nav.Link> )}
      
          {userType === "CUSTOMER" && (
      <Nav.Link className='link' href="/">Home</Nav.Link>
      )}

  
      </Nav>
      <Navbar.Collapse className="justify-content-end">
      <Nav className="me">
     
      <NavDropdown title=''  id="basic-nav-dropdown">
        
          
         
          <NavDropdown.Item onClick={logout} >Logout</NavDropdown.Item>
        </NavDropdown>
        <Avatar>{usernameTwoLetters}</Avatar>
        </Nav>
        </Navbar.Collapse>
    </Container>
  </Navbar>
 

    </div>
  );
}

export default Header;
