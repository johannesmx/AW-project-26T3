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

type FormState = {
  username: boolean | undefined
  email: boolean | undefined
  password: boolean | undefined
}

export function Register() {
  const navigate = useNavigate()
  const { register, submitting, error, isAuthenticated } = useAuth()

  const [validForm, setValidForm] = useState<FormState>({
    username: undefined,
    email: undefined,
    password: undefined,
  })

  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  useEffect(() => {
    document.title = 'Register - Verdictly'
  }, [])

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (userName === '') {
      setValidForm((prev) => ({ ...prev, username: undefined }))
      return
    }

    const isValid = userName.length >= 4 && /^[a-zA-Z0-9_]+$/.test(userName)
    setValidForm((prev) => ({ ...prev, username: isValid }))
  }, [userName])

  useEffect(() => {
    if (email === '') {
      setValidForm((prev) => ({ ...prev, email: undefined }))
      return
    }

    const trimmed = email.trim()
    const atIndex = trimmed.indexOf('@')
    const domainPart = atIndex > 0 ? trimmed.slice(atIndex + 1) : ''
    const isValid = atIndex > 0 && domainPart.includes('.') && !/\s/.test(trimmed)
    setValidForm((prev) => ({ ...prev, email: isValid }))
  }, [email])

  useEffect(() => {
    if (password === '') {
      setValidForm((prev) => ({ ...prev, password: undefined }))
      return
    }

    setValidForm((prev) => ({ ...prev, password: password.length >= 8 }))
  }, [password])

  const checkState = (target: boolean | undefined): string => {
    if (target === undefined) return ''
    return target ? 'is-valid' : 'is-invalid'
  }

  const isFormReady =
    validForm.username === true &&
    validForm.email === true &&
    validForm.password === true

  const registerHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!isFormReady || submitting) {
      return
    }

    const success = await register(userName.trim(), email.trim(), password)
    if (success) {
      navigate('/', { replace: true })
    }
  }

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ span: 4, offset: 4 }}>
          <Form noValidate id="RegisterForm" onSubmit={registerHandler}>
            <h2 className="mb-3">Sign up for an account</h2>

            {error && (
              <Alert variant="danger" role="alert">
                {error}
              </Alert>
            )}

            <Form.Group className="mb-3" controlId="registerUser">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                name="username"
                placeholder="letters, numbers and underscore (min 4)"
                value={userName}
                disabled={submitting}
                onChange={(event) => setUserName(event.target.value)}
                className={checkState(validForm.username)}
              />
              <Form.Control.Feedback type="invalid">
                Minimum 4 characters. Only a-z, A-Z, 0-9, and _ allowed; no spaces.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                disabled={submitting}
                onChange={(event) => setEmail(event.target.value)}
                className={checkState(validForm.email)}
              />
              <Form.Control.Feedback type="invalid">
                Please type a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="registerPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="Minimum 8 characters"
                value={password}
                disabled={submitting}
                onChange={(event) => setPassword(event.target.value)}
                className={checkState(validForm.password)}
              />
              <Form.Control.Feedback type="invalid">
                Minimum length is 8 characters.
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button
                variant="primary"
                type="submit"
                disabled={!isFormReady || submitting}
              >
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
                    Creating account...
                  </>
                ) : (
                  'Register'
                )}
              </Button>
            </div>

            <div className="text-center mt-4">
              <p>
                Already have an account? <Link to="/login">Sign in to your account</Link>
              </p>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}