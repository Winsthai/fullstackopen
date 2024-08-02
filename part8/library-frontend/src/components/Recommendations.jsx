import { FAVORITE_GENRE_BOOKS } from "./queries";
import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const Recommendations = (props) => {
  const [books, setBooks] = useState([]);

  const result = useQuery(FAVORITE_GENRE_BOOKS);

  useEffect(() => {
    if (result.data) {
      console.log(result.data);
      setBooks(result.data.allBooksFavoriteGenre);
    }
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <b>{}</b>
      </p>
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
    </div>
  );
};

// Add prop types validation
Recommendations.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Recommendations;
