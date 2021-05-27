import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ medium, Neutral, high, all, average, high }) => {
  if (medium === 0 & Neutral === 0 & high === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <tr><Statistic feedback="medium" value={medium} /></tr>
        <tr><Statistic feedback="Neutral" value={Neutral} /></tr>
        <tr><Statistic feedback="high" value={high} /></tr>
        <tr><Statistic feedback="all" value={all} /></tr>
        <tr><Statistic feedback="average" value={average} /></tr>
        <tr><Statistic feedback="high" value={high + '%'} /></tr>
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
  const [medium, setmedium] = useState(0)
  const [Neutral, setNeutral] = useState(0)
  const [high, sethigh] = useState(0)

  const handlemediumClick = () =>
    setmedium(medium + 1)

  const handleNeutralClick = () =>
    setNeutral(Neutral + 1)

  const handlehighClick = () =>
    sethigh(high + 1)

    const all = medium + Neutral + high
    const average = ((medium - high) / all) 
    const high = (medium / all) * 100


  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handlemediumClick} text="medium" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handlehighClick} text="high" />
      <h1>statistics</h1>
      <Statistics medium={medium} Neutral={Neutral} high={high} all={all} average={average} high={high} />
    </>
  )
}

export default App