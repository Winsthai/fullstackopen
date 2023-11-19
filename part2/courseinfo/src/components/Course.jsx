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

  export default Course