import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import  Form  from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import {  NavLink, useNavigate } from 'react-router'

interface HeaderProps {
    title: string
    image: string
}

export function Header( props:HeaderProps ) {
    let navigate = useNavigate()

    const searchHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const queryString = data.get('query')
        navigate(`/search/${queryString}`)
    }

    return (
        <Navbar expand="lg" className="bg-info-subtle" data-bs-theme="dark">
            <Container fluid className='d-flex justify-content-between'>
                <Navbar.Brand as={NavLink} to="/" href="/">
                   <img src={props.image} style={{maxWidth:"80px"}} /> 
                   <span className='d-none sm:d-block'>{ props.title }</span>
                </Navbar.Brand>
                <Form id='SearchForm' onSubmit={searchHandler} method='get' className='flex-grow-1 sm:m-0 mx-4' style={{maxWidth:'50vw'}}>
                    <InputGroup>
                        <Form.Control type="search" name="query" className='flex-grow-1' placeholder='Search for a product name or description'/>
                        <Button type="submit" className=''>Search</Button>
                    </InputGroup>
                </Form>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav" className='flex-grow-0'>
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