// import data from '../testdata/product-data.json'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import Spinner from 'react-bootstrap/Spinner'
import Alert from 'react-bootstrap/Alert'
import { Link } from 'react-router'

import { useState, useEffect} from 'react'

type Item = {
  ProductID: number
  ProductCode: string
  Name: string
  Brand: string
  Image: string
}

type ApiResponse<T> = {
  success: boolean
  error: string | null
  data: T
}

const API_BASE_URL = ''

export function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    document.title = 'Welcome to Verdictly'

    const controller = new AbortController()

    async function loadData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(`${API_BASE_URL}/api/products`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`)
        }

        const payload: ApiResponse<Item[]> = await response.json()

        if (!payload.success) {
          throw new Error(payload.error || 'Failed to load products.')
        }

        setItems(Array.isArray(payload.data) ? payload.data : [])
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }
        setError(err instanceof Error ? err.message : 'Unexpected error loading products.')
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => controller.abort()
  }, [])

  return (
    <Container fluid>
      <h1 className="my-3">Home</h1>

      {loading && (
        <div className="d-flex align-items-center gap-2 py-4">
          <Spinner animation="border" size="sm" role="status" />
          <span>Loading products...</span>
        </div>
      )}

      {!loading && error && (
        <Alert variant="danger">
          Could not load products: {error}
        </Alert>
      )}

      {!loading && !error && items.length === 0 && (
        <Alert variant="info">No products available right now.</Alert>
      )}

      {!loading && !error && items.length > 0 && (
        <Row>
          {items.map((item) => {
            const displayName =
              item.Name.length > 22 ? `${item.Name.slice(0, 22)}...` : item.Name

            return (
              <Col md={3} sm={4} xs={6} key={item.ProductID}>
                <Card className="mb-4 h-100">
                  <Link to={`/product/${item.ProductID}`}>
                    <div className="ratio ratio-1x1">
                      <Card.Img
                        src={`/images/${item.Image}`}
                        alt={item.Name}
                        variant="top"
                        className="object-fit-cover"
                      />
                    </div>
                  </Link>
                  <Card.Body>
                    <Card.Title title={item.Name}>{displayName}</Card.Title>
                    <p className="mb-0">
                      <Badge bg="secondary">{item.Brand}</Badge> {item.ProductCode}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      )}
    </Container>
  )
}