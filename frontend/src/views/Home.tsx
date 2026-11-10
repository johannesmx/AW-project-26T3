//import data from '../testdata/product-data.json'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router'

import { useEffect, useState } from 'react'

type ProductItem = {
    ProductID: number,
    ProductCode: string,
    Name: string,
    Brand: string,
    Image: string
}

export function Home() {
    const [data, setData] = useState<ProductItem[]>([])

    // function to fetch data from the API
    const getData = async () => {
        const response = await fetch('/api/products')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const itemsdata = await response.json()
        console.log(itemsdata)
        return itemsdata
    }

    useEffect( () => {
        async function fetchData() {
            const result = await getData()
            setData(result)
        }
        fetchData()
    }, [])

    // sub component
    const Items = data.map( (item:Item) => {
        return (
            <Col md={3}>
                <Card className='mb-4'>
                    <div className='ratio ratio-1x1'>
                    <Card.Img src={"images/" + item.Image}  variant='top' className='object-fit-cover' />
                    </div>
                    <Card.Body>
                        <Card.Title>{item.Name.substring(0,22) + '...'}</Card.Title>
                        {/* <p>{ item.description.substring(0,32) + '...' }</p> */}
                        <Link className='btn btn-primary' to={ 'product/' + item.ProductID }>
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