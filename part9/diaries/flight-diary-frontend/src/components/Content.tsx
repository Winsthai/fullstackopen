import { NonSensitiveDiaryEntry } from "../../../flight-diary/src/types";

const Content = ({
  diaryEntries,
}: {
  diaryEntries: NonSensitiveDiaryEntry[];
}) => {
  return (
    <>
      {diaryEntries.map((entry) => {
        return (
          <div key={entry.id}>
            <b>{entry.date}</b>
            <p>
              visibility: {entry.visibility}
              <br />
              weather: {entry.weather}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Content;
