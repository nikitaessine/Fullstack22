const Header = ({ course }) => <h2>{course}</h2>

const Part = (props) => 
      <p>
        {props.name} {props.exercises}
      </p>

const Content = ({ parts }) => 
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>

const Total = ({ parts }) => 
      <p>
        <b>Total of {parts.reduce((s, p) => s + p.exercises, 0)} exercises</b>
      </p>

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course["name"]} />
      <Content parts={course["parts"]} />
      <Total parts={course["parts"]} />
    </div>
  )
}

export default Course