import data from '../testdata/product-data.json'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router'

const ImageStyle = {
    aspectRatio: "1/1",
    objectFit: "cover"
}
export function Home() {
    // sub component
    const Items = data.map( (item) => {
        return (
            <Col md={3}>
                <Card className='mb-4'>
                    <Card.Img src={"images/" + item.image} style={ImageStyle} variant='top' />
                    <Card.Body>
                        <Card.Title>{item.name.substring(0,22) + '...'}</Card.Title>
                        <p>{ item.description.substring(0,32) + '...' }</p>
                        <Link className='btn btn-primary' to={ 'product/' + item.id }>
                            View
                        </Link>
                    </Card.Body>
                </Card>
            </Col>
        )
    })
    return(
        <>
            <Container>
            <h1>Home</h1>
                <Row>
                    {Items}
                </Row>
            </Container>
        </>
    )
}