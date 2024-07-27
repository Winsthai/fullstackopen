import { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/client";
import { SET_BIRTH, ALL_AUTHORS } from "./queries";

const NewBirthyear = (props) => {
  const [name, setName] = useState("");
  const [birthyear, setBirthyear] = useState("");

  const [updateBirth] = useMutation(SET_BIRTH, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    updateBirth({ variables: { name, setBornTo: parseInt(birthyear) } });

    setName("");
    setBirthyear("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
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
