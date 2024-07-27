import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NewBirthyear from "./components/NewBirthyear";

const App = () => {
  const [page, setPage] = useState("authors");

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("addBirth")}>add birthyear</button>
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <NewBirthyear show={page === "addBirth"}></NewBirthyear>
    </div>
  );
};

export default App;
