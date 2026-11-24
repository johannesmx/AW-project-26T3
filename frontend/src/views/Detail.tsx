import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { useAuth } from '../hooks/useAuth'

// import { StarRatingDisplay } from '../components/StarRatingDisplay'
import { StarRatingInput } from '../components/StarRatingInput'

import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'

type ProductDetail = {
    ProductID: number
    Name: string
    Description: string
    ProductCode: string
    Brand: string
    Image: string
    Caption: string
}

type ApiResponse<T> = {
    success: boolean
    error: string | null
    data: T
}

const emptyProduct: ProductDetail = {
    ProductID: 0,
    Name: '',
    Description: '',
    ProductCode: '',
    Brand: '',
    Image: '',
    Caption: '',
}

const API_BASE_URL = ''

export function Detail() {
    const { productid } = useParams()
    const [product, setProduct] = useState<ProductDetail>(emptyProduct)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [show, setShow] = useState<boolean>(false)

    // states for the review form
    const [title,setTitle] = useState<string>()
    const [rating,setRating] = useState<number>(0)
    const [body,setBody] = useState<string>()

    const { isAuthenticated } = useAuth()

    // custom button component
    const ReviewButton = () => {
        if (isAuthenticated) {
            return (
                <Button variant="primary" onClick={() => setShow(true)}>
                    Review this item
                </Button>
            )
        }
        else {
            return null
        }
    }

    useEffect(() => {
        const controller = new AbortController()

        async function loadProduct() {
            if (!productid) {
                setError('Missing product ID.')
                setLoading(false)
                return
            }

            setLoading(true)
            setError(null)
            setProduct(emptyProduct)

            try {
                // Match your router's endpoint: e.g. `${API_BASE_URL}/api/product/${productid}` or `/api/products/${productid}`
                const response = await fetch(`${API_BASE_URL}/api/products/${productid}`, {
                    signal: controller.signal,
                })

                const payload: ApiResponse<ProductDetail> = await response.json()

                if (!response.ok || !payload.success) {
                    throw new Error(payload.error || `HTTP error: ${response.status}`)
                }

                const nextProduct: ProductDetail = {
                    ...emptyProduct,
                    ...payload.data,
                }

                setProduct(nextProduct)
                document.title = nextProduct.Name ? `Detail for ${nextProduct.Name}` : 'Product Detail'
            } catch (err) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return
                }
                setError(err instanceof Error ? err.message : 'Failed to load product details.')
                document.title = 'Product Detail'
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false)
                }
            }
        }

        loadProduct()

        return () => controller.abort()
    }, [productid])

    const handleClose = () => {
        setShow(false)
    }

    const handleReviewSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault()
        // if user is not authenticated don't submit
        if(!isAuthenticated) {
            return
        }
        const data = new FormData(event.target)
        const review = {title: data.get('title'),rating: data.get('rating'), body: data.get('body')}
        console.log(review)
    }

    return (
        <Container>
            {loading && (
                <div className="d-flex align-items-center gap-2 py-4">
                    <Spinner animation="border" size="sm" role="status" />
                    <span>Loading product details...</span>
                </div>
            )}

            {!loading && error && (
                <Alert variant="danger" className="mt-4">
                    Could not load product: {error}
                </Alert>
            )}

            {!loading && !error && (
                <Row className="mt-4">
                    <Col md={6}>
                        <Image
                            src={product.Image ? `/images/${product.Image}` : ''}
                            alt={product.Caption || product.Name}
                            fluid
                        />
                    </Col>
                    <Col md={6}>
                        <h3>{product.Name}</h3>
                        <p>{product.Description}</p>
                        <p className="fs-xs">{product.ProductCode}</p>
                        <ReviewButton/>
                    </Col>
                </Row>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Review {product.Name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="reviewForm" method='post' onSubmit={ handleReviewSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Review Title</Form.Label>
                            <Form.Control name='title' type="text" placeholder="This product is excellent!" />
                        </Form.Group>
                        {/* <StarRatingDisplay range={5} rating={2} readonly={true} /> */}
                        <StarRatingInput range={5} />
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Review Text</Form.Label>
                            <Form.Control name='body' as="textarea" rows={5} placeholder="Bruh! What a product!" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type='submit' onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}