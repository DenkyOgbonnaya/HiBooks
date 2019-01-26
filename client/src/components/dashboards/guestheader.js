import React from 'react';
import Links from '../navlinks';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
   } from 'reactstrap';

export default class GuestHeader extends React.Component {
  
    state = {
      isOpen: false
    };
  
  toggle =()=> {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar dark style={{ backgroundColor: '#333', borderColor: '#333' }} expand="md">
          <NavbarBrand href="/">HiBooks</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
              <Links route='/login' name='Login' />
              </NavItem>
              <NavItem>
                <Links route='/signUp' name='Sign Up' />
              </NavItem>
              <NavItem>
                <Links route='/about' name='About' />
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}