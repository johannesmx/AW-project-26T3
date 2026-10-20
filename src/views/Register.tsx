import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import {useState, useEffect} from 'react'
import ValidationStates from '../interfaces/ValidationStates'

export function Register() {
   const [username,setUsername] = useState<string>("")
   const [validForm,setValidForm] = useState({username:ValidationStates.NONE, email: ValidationStates.NONE, password: ValidationStates.NONE })
    return (
        <Container>
            <Row className='mt-4'>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form>
                        <h2>Sign up for an account</h2>
                        <Form.Group className="mb-3" controlId="registerUser">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" placeholder="letters and numbers" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="password" placeholder="Minimum 8 characters" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant='primary' type="button">Register</Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}