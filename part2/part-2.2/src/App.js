import React from 'react'

const Header = ({ main }) => {
  return (
      <h2>{main.name}</h2>
  )
}

const Partt = (props) => {
  return (
      <p>
          {props.part.name} {props.part.exercises}
      </p>
  )
}

const Content = ({ main }) => {
  return (
      <div>
          {main.parts.map((part) => <Partt part={part} />)}
      </div>
  )
}


const Total = ({ main }) => {
const sum=main.parts[0].exercises + main.parts[1].exercises + main.parts[2].exercises
return (
   <strong>total of {sum} exercises</strong>
		
	);
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
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