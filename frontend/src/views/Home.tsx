//import data from '../testdata/product-data.json'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router'

import { useState, useEffect} from 'react'

type Item = {
        ProductID:number,
        ProductCode:string,
        Name:string,
        Brand:string,
        Image:string,
}

export function Home() {
    // states
    const[ data, setData ] = useState<[] | Item[]>([])

     //fetch function
    const getData = async () => {
        const response = await fetch('/api/products')
        if(!response.ok) {
            throw new Error(`HTTP error: ${ response.status }`)
        }
        const itemsdata = await response.json()
        return itemsdata
    }

    useEffect( () => {
        async function loadData() {
            const result = await getData()
            console.log(result)
            setData(result)
        }
        loadData()
    },[])

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
                        <p>{ item.ProductCode }</p>
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