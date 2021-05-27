import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ high, medium, low }) => {
  if (high === 0 & medium === 0 & low === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <tr><Statistic feedback="high" value={high} /></tr>
        <tr><Statistic feedback="medium" value={medium} /></tr>
        <tr><Statistic feedback="low" value={low} /></tr>
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
  const [high, sethigh] = useState(0)
  const [medium, setmedium] = useState(0)
  const [low, setlow] = useState(0)

  const handlehighClick = () =>
    sethigh(high + 1)

  const handlemediumClick = () =>
    setmedium(medium + 1)

  const handlelowClick = () =>
    setlow(low + 1)


  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handlehighClick} text="high" />
      <Button handleClick={handlemediumClick} text="medium" />
      <Button handleClick={handlelowClick} text="low" />
      <h1>statistics</h1>
      <Statistics high={high} medium={medium} low={low} />
    </>
  )
}

export default App