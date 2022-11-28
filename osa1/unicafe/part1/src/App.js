import { useState } from 'react'

const Statistics = (props) => {
  
  if (props.all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
  
  return (
    <div>

      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.all} />
      <StatisticLine text="average" value ={(props.good*1 + props.bad*-1) / props.all} />
      <StatisticLine text="positive" value = {(props.good*1/props.all)*100 + "%"}/>
      </div>
  )
}


const StatisticLine = (props) => (
  <table>
    <tbody>
      <tr>
        <td>{props.text} </td>
        <td>{props.value} </td>
      </tr>
    </tbody>
  </table>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const goodClick = () => {
    setAll(all + 1)
    setGood(good + 1)
    setAverage(average + 1)
  } 

  const neutralClick = () => {
    setAll(all + 1)
    setNeutral(neutral + 1)
  } 

  const badClick = () => {
    setAll(all + 1)
    setBad(bad + 1)
    setAverage(average - 1)
  } 


  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button handleClick={() => goodClick(good + 1)} text = "good"/>
        <Button handleClick={() => neutralClick(neutral + 1)} text = "neutral"/>
        <Button handleClick={() => badClick(bad + 1)} text = "bad"/>

      <h1>Statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average}></Statistics>

     </div>
    </div>    

  )
}

export default App