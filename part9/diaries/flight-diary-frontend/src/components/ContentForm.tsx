import { useState } from "react";
import axios from "axios";
import { Dispatch, SetStateAction } from "react";
import { NonSensitiveDiaryEntry } from "../../../flight-diary/src/types";

interface diaryProps {
  diaryEntries: NonSensitiveDiaryEntry[];
  setDiaryEntries: Dispatch<SetStateAction<NonSensitiveDiaryEntry[]>>;
}

const ContentForm = ({ diaryEntries, setDiaryEntries }: diaryProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const createNewDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      weather: weather,
      visibility: visibility,
      date: date,
      comment: comment,
    };
    axios
      .post("http://localhost:3000/api/diaries", newDiary)
      .then((response) => {
        setDiaryEntries(diaryEntries.concat(response.data));
      });
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={createNewDiary}>
        <div>
          date:{" "}
          <input
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility:{" "}
          <input
            value={visibility}
            onChange={(event) => setVisibility(event.target.value)}
          />
        </div>
        <div>
          weather:{" "}
          <input
            value={weather}
            onChange={(event) => setWeather(event.target.value)}
          />
        </div>
        <div>
          comment:{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default ContentForm;
