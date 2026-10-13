import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

interface ProductType {
    id: number
    name: string
    description: string
    price: number
    category: number
    brand: string
    image: string
}

const emptyProduct = {
    id: 0,
    name: "",
    description: "",
    price: 0,
    category: "",
    brand: "",
    image: "",
}

export function Detail() {
    let { productid } = useParams()
    const [product, setProduct] = useState(emptyProduct)
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
        fetch("/testdata/product-data.json").then((response) => response.json())
            .then((data) => {
                const item = data.find((product: any) => product.id == productid)
                setProduct(item)
            })
    })

    // function to handle review submission
    const handleClose = () => {
        setShow(false)
    }

    return (
        <Container>
            <Row className='mt-4'>
                <Col>
                    <Image src={'/images/' + product.image} fluid />
                </Col>
                <Col>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p className="fs-3">${product.price}</p>
                    <Button variant='primary' onClick={() => setShow(true)}>Review this item</Button>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Review {product.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Review Title </Form.Label>
                            <Form.Control type="text" placeholder="This product is excellent!" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Review Text</Form.Label>
                            <Form.Control as="textarea" rows={5} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}