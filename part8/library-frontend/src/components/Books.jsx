import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { ALL_BOOKS } from "./queries";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all genres");

  const result = useQuery(ALL_BOOKS);

  // Loads all the genres buttons
  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
      const genres = new Set();
      for (let i = 0; i < result.data.allBooks.length; i++) {
        result.data.allBooks[i].genres.forEach((item) => genres.add(item));
      }
      setGenres([...genres]);
    }
  }, [result.data]);

  // Renders the books based on the currently selected genre
  useEffect(() => {
    if (result.data) {
      if (selectedGenre === "all genres") {
        setBooks(result.data.allBooks);
      } else {
        setBooks(
          result.data.allBooks.filter((book) =>
            book.genres.includes(selectedGenre)
          )
        );
      }
    }
  }, [result.data, selectedGenre]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((a) => (
          <button
            key={a}
            onClick={() => {
              setSelectedGenre(a);
            }}
          >
            {a}
          </button>
        ))}
        <button
          onClick={() => {
            setSelectedGenre("all genres");
          }}
        >
          all genres
        </button>
      </div>
    </div>
  );
};

// Add prop types validation
Books.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Books;
