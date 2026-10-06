import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router'

interface HeaderProps {
    title: string
    image: string
}

export function Header( props:HeaderProps ) {
    return (
        <Navbar expand="lg" className="bg-info-subtle" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand href="/">
                   <img src={props.image} style={{width:"80px"}} /> 
                   { props.title }
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}