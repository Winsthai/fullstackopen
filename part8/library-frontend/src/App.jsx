import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import NewBirthyear from "./components/NewBirthyear";
import LoginForm from "./components/LoginForm";
import { useApolloClient } from "@apollo/client";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  const logout = () => {
    client.resetStore();
    setToken(null);
    // Clear local storage and cache
    localStorage.clear();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ? (
          <button onClick={() => setPage("loginForm")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("addBirth")}>add birthyear</button>
            <button onClick={() => setPage("recommend")}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <NewBirthyear show={page === "addBirth"}></NewBirthyear>

      <LoginForm show={page === "loginForm"} setToken={setToken}></LoginForm>

      <Recommendations show={page === "recommend"}></Recommendations>
    </div>
  );
};

export default App;
