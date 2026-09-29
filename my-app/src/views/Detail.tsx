import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useParams } from 'react-router'

export function Detail() {
    let {productid} = useParams()
    return (
        <Container>
            <Row>
                <Col>
                    <h3>Detail {productid}</h3>
                </Col>
            </Row>
        </Container>
    )
}