import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Content from "./components/Content";
import ContentForm from "./components/ContentForm";
import { NonSensitiveDiaryEntry } from "../../flight-diary/src/types";

const App = () => {
  const [diaryEntries, setDiaryEntires] = useState<NonSensitiveDiaryEntry[]>(
    []
  );

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((response) => setDiaryEntires(response.data));
  }, []);

  return (
    <>
      <ContentForm
        diaryEntries={diaryEntries}
        setDiaryEntries={setDiaryEntires}
      ></ContentForm>
      <Header></Header>
      <Content diaryEntries={diaryEntries}></Content>
    </>
  );
};

export default App;
