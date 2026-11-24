import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { useAuth } from '../hooks/useAuth'

export function Login() {
  const navigate = useNavigate()
  const { login, submitting, error, isAuthenticated } = useAuth()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    document.title = 'Sign In - Verdictly'
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      //navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const canSubmit = email.trim().length > 0 && password.length > 0 && !submitting

  const loginHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!canSubmit) {
      return
    }

    const success = await login(email.trim(), password)
    if (success) {
      //navigate('/', { replace: true })
    }
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 4, offset: 4 }}>
          <Form noValidate id="LoginForm" onSubmit={loginHandler}>
            <h2 className="mb-3">Sign in to your account</h2>

            {error && (
              <Alert variant="danger" role="alert">
                {error}
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                disabled={submitting}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                value={password}
                disabled={submitting}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={!canSubmit}>
                {submitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Signing in...
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </div>

            <div className="text-center mt-4">
              <p>
                Don&apos;t have an account? <Link to="/register">Sign up for an account</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}