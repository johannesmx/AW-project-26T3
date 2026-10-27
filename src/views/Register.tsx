import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router'
import {useState,useEffect} from 'react'

type Formstate = {
    username: undefined | boolean
    email: undefined | boolean
    password: undefined | boolean
}

export function Register() {
    // valid form state
    const[validForm,setValidForm] = useState<Formstate>({
        username:undefined,
        email:undefined,
        password:undefined
    })
    //username
    const[userName,setUserName] = useState<string | undefined>(undefined)
    //email
    const[email,setEmail] = useState<string | undefined>(undefined)
    //username
    const[password,setPassword] = useState<string | undefined>(undefined)

    useEffect( () => {
        if( userName === undefined ) { return }
        else if( userName.length >= 4 && /^[a-zA-Z0-9_]+$/.test(userName)) {
            setValidForm({...validForm, username: true })
        }
        else {
            setValidForm({...validForm, username: false })
        }
    }, [userName] )

    useEffect( () => {
        if( email === undefined ) { return }
        if( email.indexOf('@') > 0 && email?.includes('.') ) {
            setValidForm({...validForm, email: true  })
        }
        else {
            setValidForm({...validForm, email: false  })
        }
    }, [email])
    // function to return bootstrap classname based on validation rules
    const checkState = (target:Formstate[keyof Formstate]) => {
        if(target === undefined) {
            return ''
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
                                required
                                type="text"
                                name="username" 
                                placeholder="letters,numbers and underscore" 
                                value={userName}
                                onChange={(event) => setUserName(event.target.value) }
                                className={ checkState(validForm.username) }
                            />
                            <Form.Control.Feedback type="invalid">
                                Only a-z A-Z 0-9 and _ allowed. No spaces
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control 
                                required
                                type="email" 
                                name="email"
                                placeholder="name@example.com" 
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                className={ checkState(validForm.email) }
                            />
                             <Form.Control.Feedback type="invalid">
                                Please type a valid email address
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Minimum 8 characters" />
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