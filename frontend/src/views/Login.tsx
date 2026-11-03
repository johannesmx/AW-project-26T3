import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router'
export function Login() {
    return (
        <Container>
            <Row className='mt-4'>
                <Col md={{ span: 4, offset: 4 }}>
                    <Form>
                        <h2>Sign in to your account</h2>
                        <Form.Group className="mb-3" controlId="loginEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="name@example.com" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="loginPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Minimum 8 characters" />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant='primary' type="button">Login</Button>
                        </div>
                        <div className="text-center mt-4">
                            <p>Don't have an account? <Link to="/register">Sign up for an account</Link></p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}