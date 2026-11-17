import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Button from 'react-bootstrap/Button'

import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'

type Item = {
    ProductID:number,
    ProductCode:string,
    Name:string,
    Brand:string,
    Image:string
}

export function SearchResult() {
    const[ results, setResults ] = useState< [] | Item[] >([])

    let {query} = useParams()

    const getSearchResults = async () => {
        const response = await fetch(`/api/search?query=${query}`)
        if( !response.ok ) {
            throw new Error(`HTTP error: ${response.status}`)
        }
        const searchResults = await response.json()
        return searchResults
    }

    useEffect( () => {
        async function getResults() {
            const results = await getSearchResults()
            setResults(results)
            document.title = 'Search results for ' + query
        }
        getResults()
    }, [query])

    const ResultItems = results.map( (item,key) => {
        return (<Row key={key}>
            <Col md={4}>
                <Image src={`/images/${item.Image}`} className='mw-100 object-fit-cover'/>
            </Col>
            <Col md={6}>
                <h3>{item.Name}</h3>
                <p>{item.Brand}</p>
            </Col>
            <Col md={2}>
                <Link className='btn btn-primary' to={`/product/${item.ProductID}`}>
                    Item Detail
                </Link>
            </Col>
        </Row>)
    })

    return (
        <Container>
            {ResultItems}
        </Container>
    )
}