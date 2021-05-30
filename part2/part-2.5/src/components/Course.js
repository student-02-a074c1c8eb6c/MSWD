import React from 'react'

const Header = ({ main }) => {
    return (
        <h2>{main.name}</h2>
    )
}

const Parts = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}

const Content = ({ main }) => {
    return (
        <div>
            {main.parts.map((part) => <Parts part={part} />)}
        </div>
    )
}

const Total = ({ main }) => {
    const sum = main.parts.reduce((total, part) => total + part.exercises, 0)
    return (
        <strong>Number of exercises {sum}</strong>
    )
}

const Course = ({ main }) => {
    return (
        <>
            <Header main={main} />
            <Content main={main} />
            <Total main={main} />
        </>
    )
}

export default Course