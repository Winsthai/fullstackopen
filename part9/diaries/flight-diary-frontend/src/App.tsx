import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Content from "./components/Content";

const App = () => {
  const [diaryEntries, setDiaryEntires] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/diaries")
      .then((response) => setDiaryEntires(response.data));
  }, []);

  return (
    <>
      <Header></Header>
      <Content diaryEntries={diaryEntries}></Content>
    </>
  );
};

export default App;
