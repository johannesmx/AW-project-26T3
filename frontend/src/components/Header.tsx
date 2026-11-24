import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form'
import { NavLink, useNavigate } from 'react-router'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { useAuth } from '../hooks/useAuth'
import {useEffect} from 'react'

interface HeaderProps {
    title: string
    image: string
}

export function Header(props: HeaderProps) {
    const { user, isAuthenticated } = useAuth()

    let NavObjects = (!isAuthenticated) ? [
        { name: 'Home', path: '/'}, 
        { name: 'Login', path: '/login'},
        { name: 'Register', path: '/register'}
    ] :
    [
        { name: 'Home', path: '/'}, 
        { name: 'Dashboard', path: '/dashboard'}, 
        { name: 'Logout', path: '/logout'}
    ]

    const NavItems = NavObjects.map( (item,key) => {
        return (
            <Nav.Link key={key} as={NavLink} to={item.path} href={item.path}>{item.name}</Nav.Link>
        )
    })

    let navigate = useNavigate()
    
    const searchHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        const data = new FormData(event.target)
        const queryString = data.get('query')
        navigate(`/search/${queryString}`)
    }

    useEffect( () => {
       console.log(user)
    }, [isAuthenticated,user])


    return (
        <Navbar expand="lg" className="bg-info-subtle" data-bs-theme="dark">
            <Container fluid>
                <Navbar.Brand as={NavLink} to="/" href="/">
                    <img src={props.image} style={{ width: "80px" }} />
                    {props.title}
                </Navbar.Brand>
               { (user) ? <Navbar.Text>Hello {user.Name}</Navbar.Text> : '' }
                <Form id='SearchForm' onSubmit={searchHandler} method='get' className='flex-grow-1' style={{maxWidth:'50vw'}}>
                    <InputGroup>
                        <Form.Control type='search' name='query' placeholder='Search for a product' />
                        <Button type='submit' variant='dark'>Search</Button>
                    </InputGroup>
                </Form>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav" className='flex-grow-0'>
                    <Nav className="ms-auto">
                        {NavItems}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}