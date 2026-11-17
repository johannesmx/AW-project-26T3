import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import { useState, useEffect } from 'react'

import { useParams } from 'react-router'

const emptyProduct = {
    ProductID: 0,
    Name: "",
    Description: "",
    Caption: "",
    Brand: "",
    Image: "",
    ProductCode: ""
}

type ProductItem = {
    ProductID: number,
    Name: string,
    Description: string,
    Caption: string,
    Brand: string,
    Image: string,
    ProductCode: string
}

export function Detail() {
    let { productid } = useParams()
    const [product, setProduct] = useState<ProductItem>(emptyProduct)
    const [show, setShow] = useState<boolean>(false)

    useEffect(() => {
       async function fetchProduct() {
            const response = await fetch(`/api/product/${productid}`)
            if( ! response.ok ) {
                throw new Error(`HTTP Error: ${response.status } ` )
            }
            const data = await response.json()
            setProduct(data)
            document.title = "Detail for " + data.Name
       }
       fetchProduct()
    }, [])

    // function to handle review submission
    const handleClose = () => {
        setShow(false)
    }

    return (
        <Container>
            <Row className='mt-4'>
                <Col>
                    <Image src={'/images/' + product.Image} fluid />
                </Col>
                <Col>
                    <h3>{product.Name}</h3>
                    <p>{product.Description}</p>
                    <p className="fs-3">{product.ProductCode}</p>
                    <Button variant='primary' onClick={() => setShow(true)}>Review this item</Button>
                </Col>
            </Row>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Review {product.Name}</Modal.Title>
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