import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ low, medium, high, all, average, positive }) => {
 
  return (
    <table>
      <tbody>
        <tr><Statistic feedback="low" value={low} /></tr>
        <tr><Statistic feedback="medium" value={medium} /></tr>
        <tr><Statistic feedback="high" value={high} /></tr>
        <tr><Statistic feedback="all" value={all} /></tr>
        <tr><Statistic feedback="average" value= {average} /></tr>
        <tr><Statistic feedback="positive" value={positive + '%'} /></tr>
      </tbody>
    </table>
  )
}

const Statistic = ({ feedback, value }) => {
  return (
    <td>{feedback} {value}</td>
  )
}

const App = () => {
  const [low, setlow] = useState(0)
  const [medium, setmedium] = useState(0)
  const [high, sethigh] = useState(0)

  const handlelowClick = () =>
    setlow(low + 1)

  const handlemediumClick = () =>
    setmedium(medium + 1)

  const handlehighClick = () =>
    sethigh(high + 1)

    const all = low + medium + high
    
    const average = ((low - high) / all)

    const positive = (low / all) * 100


  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handlelowClick} text="low" />
      <Button handleClick={handlemediumClick} text="medium" />
      <Button handleClick={handlehighClick} text="high" />
      <h1>statistics</h1>
      <Statistics low={low} medium={medium} high={high} all={all} average={average} positive={positive} />
    </>
  )
}

export default App