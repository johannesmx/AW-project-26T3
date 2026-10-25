import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router'
import {useState,useEffect} from 'react'

interface Formstate {
    username: undefined | boolean
    email: undefined | boolean
    password: undefined | boolean
}

export function Register() {
    // valid form state
    const[validForm,setValidForm] = useState<Formstate>({username:undefined,email:undefined,password:undefined})
    //username
    const[userName,setUserName] = useState<string>('')
    //email
    const[email,setEmail] = useState<string>('')
    //username
    const[password,setPassword] = useState<string>('')

    useEffect( () => {
        if(userName.length > 4) {
            setValidForm({username:true,email:undefined,password:undefined})
        }
    },[userName,email,password])

    // function to return bootstrap classname based on validation rules
    const checkState = (target:string | undefined) => {
        if(target === undefined) {
            return null
        }
        else if( target === false ) {
            return "is-invalid"
        }
        else {
            return "is-valid"
        }
    }

    return (
        <Container>
            <Row className='mt-4'>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form>
                        <h2>Sign up for an account</h2>
                        <Form.Group className="mb-3" controlId="registerUser">
                            <Form.Label>Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="letters,numbers and underscore" 
                                value={userName}
                                onChange={(event) => setUserName(event.target.value) }
                                className={ checkState(validForm.username) }
                            />
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
                         <div className="text-center mt-4">
                            <p>Already have an account? <Link to="/login">Sign in to your account</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}