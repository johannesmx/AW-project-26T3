// import data from '../testdata/product-data.json'
import {useState,useEffect} from 'react'

import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router'

import type {Item} from '../interfaces/Item'


export function Home() {
    const[data,setData] = useState<Item[] | []>([])

    useEffect( () => {
       fetch("/testdata/product-data.json").then((response) => response.json())
            .then((items:Item[]) => {
                setData( items )
            })
    },[data])
    // sub component
    const Items = data.map( (item,key) => {
        return (
            <Col md={3} key={key}>
                <Card className='mb-4'>
                    <div className='ratio ratio-1x1'>
                    <Card.Img src={"images/" + item.image}  variant='top' className='object-fit-cover' />
                    </div>
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