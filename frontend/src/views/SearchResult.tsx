import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import { Link, useParams } from "react-router"
import { useState, useEffect } from 'react'

type Item = {
        ProductID:number,
        ProductCode:string,
        Name:string,
        Brand:string,
        Image:string,
}

export function SearchResult() {
    const[results,setResults] = useState< [] | Item[] >([])
    // get the query string from the route
    let {query} = useParams()

    const getSearchResults = async () => {
        const response = await fetch(`/api/search?query=${query}`)
        if(!response.ok) {
            throw new Error(`HTTP error: ${ response.status }`)
        }
        const searchresults = await response.json()
        return searchresults
    }

    useEffect( () => {
        async function getResults() {
            const result = await getSearchResults()
            setResults(result)
        }
        getResults()
        document.title = 'Search results for ' + query
    },[query])

    const ResultItems = results.map( (item,key) => {
        return (
            <>
            <Row key={key} className='mb-3'>
                <Col md={3}>
                    <Image src={'/images/' + item.Image } className='mw-100 object-fit-cover' style={{aspectRatio:'1/1'}}/>
                </Col>
                <Col md={6}>
                    <h3>{item.Name}</h3>
                    <p>{item.Brand}</p>
                </Col>
                <Col md={2} className='d-flex flex-column justify-content-end'>
                <Link to={`/product/${item.ProductID}`}>
                    <Button variant='dark' type='button'>
                        Detail
                    </Button>
                </Link>
                </Col>
            </Row>
            <hr/>
            </>
        )
    })
    return (
        <>
            <Container className='my-4'>
                {ResultItems}
            </Container>
        </>
    )
}