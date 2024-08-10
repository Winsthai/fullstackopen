import { CoursePart } from "../../App";
import Part from "./Part";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((part) => {
        return <Part coursePart={part} key={part.name}></Part>;
      })}
    </>
  );
};

export default Content;
