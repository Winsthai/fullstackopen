import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./queries";
import { GraphQLError } from "graphql";
import PropTypes from "prop-types";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: () => {
      throw new GraphQLError("not authenticated", {
        extensions: {
          code: "BAD_USER_INPUT",
        },
      });
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("login-user-token", token);
    }
    setUsername("");
    setPassword("");
  }, [result.data]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    login({ variables: { username, password } });
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

// Add prop types validation
LoginForm.propTypes = {
  show: PropTypes.bool.isRequired,
  setToken: PropTypes.func.isRequired,
};

export default LoginForm;
