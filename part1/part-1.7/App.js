import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Statistics = ({ easy, moderate, difficult, all, average, positive }) => {
 
  return (
    <table>
      <tbody>
        <tr><Statistic feedback="easy" value={easy} /></tr>
        <tr><Statistic feedback="moderate" value={moderate} /></tr>
        <tr><Statistic feedback="difficult" value={difficult} /></tr>
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
  const [easy, setEasy] = useState(0)
  const [moderate, setModerate] = useState(0)
  const [difficult, setDifficult] = useState(0)

  const handleEasyClick = () =>
    setEasy(easy + 1)

  const handleModerateClick = () =>
    setModerate(moderate + 1)

  const handleDifficultClick = () =>
    setDifficult(difficult + 1)

    const all = easy + moderate + difficult
    
    const average = ((easy - difficult) / all)

    const positive = (easy / all) * 100


  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleEasyClick} text="easy" />
      <Button handleClick={handleModerateClick} text="moderate" />
      <Button handleClick={handleDifficultClick} text="difficult" />
      <h1>statistics</h1>
      <Statistics easy={easy} moderate={moderate} difficult={difficult} all={all} average={average} positive={positive} />
    </>
  )
}

export default App