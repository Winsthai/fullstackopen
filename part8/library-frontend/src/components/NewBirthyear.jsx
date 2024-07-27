import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "@apollo/client";
import { SET_BIRTH, ALL_AUTHORS } from "./queries";

const NewBirthyear = (props) => {
  const [birthyear, setBirthyear] = useState("");

  const [updateBirth] = useMutation(SET_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const result = useQuery(ALL_AUTHORS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const authors = result.data.allAuthors;

  const submit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const formJson = Object.fromEntries(formData.entries());
    const name = formJson.selectedAuthor;

    updateBirth({ variables: { name, setBornTo: parseInt(birthyear) } });

    setBirthyear("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <select name="selectedAuthor">
          {authors.map((author) => {
            return (
              <option key={author.name} value={author.name}>
                {author.name}
              </option>
            );
          })}
        </select>
        <div>
          birthyear
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

// Add prop types validation
NewBirthyear.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default NewBirthyear;
