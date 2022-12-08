import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Container, Nav, Navbar as BNavbar, NavDropdown} from "react-bootstrap";


const Navbar: React.FC = () => {
  return (
    <BNavbar variant="dark" bg="dark" expand="sm">
      <Container fluid>
        <BNavbar.Brand as={Link} to='/'>Static Pages</BNavbar.Brand>
        <BNavbar.Toggle/>
        <BNavbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
            <NavDropdown
              style={{zIndex: 1021}}
              title="Admin"
              menuVariant="dark"
              align='end'
            >
              <NavDropdown.Item as={NavLink} to='pages/admin/edit'>Edit</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to='pages/admin/create'>Create</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BNavbar.Collapse>
      </Container>
    </BNavbar>
  );
};

export default Navbar;