import Form from 'react-bootstrap/Form'
import { useState, useEffect } from 'react'

type StarRatingInputProps = {
    range: number
}

export function StarRatingInput(props: StarRatingInputProps) {
    const [stars, setStars] = useState<boolean[]>([])
    const [rating,setRating] = useState(0)

    useEffect(() => {
        let starsArray = []
        for (let i = 0; i < props.range; i++) {
            starsArray.push(false)
        }
        setStars(starsArray)
    }, [props.range])

    const starClickHandler = (s:number) => {
        setRating(s+1)
        let strs = [...stars]
        for( let i=0; i < props.range; i++ ) {
            strs[i] = ( i < s+1 ) ? true : false
        }
        //console.log( strs )
        setStars( strs )
    }

    const StarButtons = stars.map((item, key) => {
        return (
            <div key={key} onClick={() => starClickHandler(key)} className="fs-3">
                {/* print white or black star characters */}
                { (item == true ) ? '\u2605' : '\u2606'}
            </div>
        )
    })

    return (
        <div className='d-flex gap-4 fs-lg align-items-center mb-3'>
            {StarButtons}
            <Form.Control type='hidden' name='rating' value={rating} />
            <p className='m-0'>You rated it <strong>{rating}</strong> { (rating > 1) ? 'stars' : 'star'}</p>
        </div>
    )
}