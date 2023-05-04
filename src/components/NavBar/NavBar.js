import React from 'react';
import './NavBar.module.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../index.css'
import {useNavigate} from "react-router-dom";

document.body.color = "white"

function NavBar() {
    const navigate = useNavigate();
    function goToCreate() {
        navigate('/create', {replace: true})
    }
    function goToHome() {
        navigate('/', {replace: true})
    }
    function goToAbout() {
        navigate('/about', {replace: true})
    }

    return (
        <div className="NavBar">
            <Navbar bg="dark" expand="lg">
                <Container>
                    <Navbar.Brand onClick={goToHome}>TJH4k6 Project FlashCards</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link onClick={goToHome}>Home</Nav.Link>
                            <Nav.Link onClick={goToCreate}>Create</Nav.Link>
                            <Nav.Link onClick={goToAbout}>About</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

NavBar.propTypes = {};

NavBar.defaultProps = {};

export default NavBar;
