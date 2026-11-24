
import { useState, useEffect } from 'react'
type StarRatingProps = {
    range: number,
    readonly: boolean,
    rating: number
}
export function StarRatingDisplay (props: StarRatingProps) {
    const [display, setDisplay] = useState<boolean[]>([])

    useEffect(() => {
        let items = []
        let totalRating = props.rating
        for (let i = 0; i < props.range; i++) {
            if (totalRating > 0) {
                items.push(true)
            }
            else {
                items.push(false)
            }
            totalRating -= 1
        }
        setDisplay(items)
    }, [props.range])

    const DisplayItems = display.map((item) => {
        if (item === true)
            return (
                <span>
                    {'\u2605'}
                </span>
            )
        else {
            return (
                <span>
                    {'\u2606'}
                </span>
            )
        }
    })

    return (
        <div className='d-flex gap-2'>
            {DisplayItems}
        </div>
    )

}