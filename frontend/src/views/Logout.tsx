
import Container from 'react-bootstrap/Container'
import { useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useEffect } from 'react'

export function Logout() {
    const navigate = useNavigate()
    const {logout, submitting, isAuthenticated} = useAuth()

    useEffect( () => {
        if(submitting) {
            return
        }
        logout()
        navigate('/', { replace: true })
    }, [isAuthenticated])

    return(
        <Container>
            <h2>Logout</h2>
        </Container>
    )
}