import { CoursePart } from "../../App";

const Part = ({ coursePart }: { coursePart: CoursePart }) => {
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (coursePart.kind) {
    case "basic":
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount} <br />
            <i>{coursePart.description}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount} <br />
            project exercises: {coursePart.groupProjectCount}
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount} <br />
            <i>{coursePart.description}</i> <br />
            background material: {coursePart.backgroundMaterial}
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
            {coursePart.name} {coursePart.exerciseCount} <br />
            <i>{coursePart.description}</i> <br />
            required skills: {coursePart.requirements.join(", ")}
          </p>
        </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;
