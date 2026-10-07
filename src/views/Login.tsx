import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {useState,useEffect} from 'react'

export function Login() {
    const[email,setEmail] = useState<string | undefined >()
    const[validEmail,setValidEmail] = useState<boolean | undefined>()

    useEffect( () => {
        if(email && email.length > 3) {
            setValidEmail(true)
        }
        else {
            setValidEmail(false)
        }
    },[email])

    return (
        <Container>
            <Row className='mt-4'>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form noValidate>
                        <h2>Sign in to your account</h2>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                required
                                type="email" 
                                placeholder="name@example.com" 
                                value={email}
                                onChange={ (event) => setEmail(event.target.value)}
                                className={ (validEmail && validEmail===true) ? "is-valid" : (validEmail === false) ? "is-invalid" : ""}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid email address
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Minimum 8 characters" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant='primary' type="button">Login</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}