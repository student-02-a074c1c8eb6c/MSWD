import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange } from '../reducers/filterReducer'

const Filter = () => {
    const disth = useDispatch()

    const hachange = (event) => {
        disth(filterChange(event.target.value))
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
        filter <input onChange={hachange} />
        </div>
    )
}

export default Filter
