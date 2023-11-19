const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises}></Part>)}
    </>
  )
}

// Component will have to be rewritten
const Total = ({parts}) => {
  const initialValue = 0
  const sum = parts.reduce((accumulator, currentValue) => accumulator + currentValue.exercises, initialValue)

  return (
    <>
      <b>total of {sum} exercises</b>
    </>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}></Header>
      <Content parts={course.parts}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
  }

  return <Course course={course} />
}

export default App