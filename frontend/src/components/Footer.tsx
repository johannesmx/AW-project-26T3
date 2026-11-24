import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink } from 'react-router'

type FooterProps = {
    image: string,
    title: string
}
export function Footer(props: FooterProps) {
    return (
        <footer>
            <Navbar className="bg-info-subtle" data-bs-theme="dark">
                <Container fluid>
                    <Navbar.Brand>
                        <img src={props.image} style={{ width: "80px" }} />
                        {props.title}
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link as={NavLink} to="/about" href="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact" href="/contact">Contact</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </footer>
    )
}