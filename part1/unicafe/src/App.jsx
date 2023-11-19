import { useState } from 'react'

const Button = (props) => {

}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  return (
    <table>
      <StatisticLine text="good" value={good}></StatisticLine>
      <StatisticLine text="neutral" value={neutral}></StatisticLine>
      <StatisticLine text="bad" value={bad}></StatisticLine>
      <StatisticLine text="all" value={total}></StatisticLine>
      <StatisticLine text="average" value={((good * 1) + (neutral * 0) + (bad * -1)) / total}></StatisticLine>
      <StatisticLine text="all" value={total}></StatisticLine>
      <StatisticLine text="positive" value={(good / total) * 100  + " %"}></StatisticLine>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <>
      <tr>
        <td>{text}</td> <td>{value}</td>
      </tr>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad

  if (total == 0) {
    return (
      <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <p>No Feedback given</p>
    </div>
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App