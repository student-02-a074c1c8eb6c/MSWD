import React from 'react'

const Header = ({ main }) => {
  return (
      <h2>{main.name}</h2>
  )
}

const Part = (props) => {
  return (
      <p>
          {props.part.name} {props.part.exercises}
      </p>
  )
}

const Content = ({ main }) => {
  return (
      <div>
          {main.parts.map((part) => <Part part={part} />)}
      </div>
  )
}


const Course = ({ main }) => {
  return (
      <>
          <Header main={main} />
          <Content main={main} />
         
      </>
  )
}
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        
      ]
    },
    
  ]

  return (
    <>
      
      {courses.map(main => <Course main={main} />)}
    </>
  )
}

export default App