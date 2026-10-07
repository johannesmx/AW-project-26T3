import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link, NavLink } from 'react-router'

interface HeaderProps {
    title: string
    image: string
}

export function Header( props:HeaderProps ) {
    return (
        <Navbar expand="lg" className="bg-info-subtle" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/" href="/">
                   <img src={props.image} style={{width:"80px"}} /> 
                   { props.title }
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" href="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/login" href="/login">Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/register" href="/register">Register</Nav.Link>
                        <Nav.Link as={NavLink} to="/about" href="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact" href="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}