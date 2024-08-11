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
  const [notification, setNotification] = useState("");

  const createNewDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newDiary = {
      weather: weather,
      visibility: visibility,
      date: date,
      comment: comment,
    };
    try {
      const response = await axios.post(
        "http://localhost:3000/api/diaries",
        newDiary
      );
      setDiaryEntries(diaryEntries.concat(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response.data);
        setTimeout(() => {
          setNotification("");
        }, 5000);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <div style={{ color: "red", paddingBottom: "1em" }}>{notification}</div>
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
