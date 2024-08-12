import {
  Container,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { apiBaseUrl } from "../../../../constants";
import { Diagnosis } from "../../../../types";
import { context } from "../../context";

const NewHealthCheckForm = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [rating, setRating] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [fetchedDiagnosisCodes, setFetchedDiagnosisCodes] = useState<
    Diagnosis[]
  >([]);
  const [error, setError] = useState("");

  const { id, setEntries } = useContext(context);
  let { entries } = useContext(context);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then((response) => setFetchedDiagnosisCodes(response.data));
  }, []);

  const handleSelect = (event: SelectChangeEvent) => {
    setRating(event.target.value);
  };

  const handleCodesSelect = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const handleCancel = () => {
    // Cancel the form
  };

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry = {
      date,
      description,
      specialist,
      diagnosisCodes,
      type: "HealthCheck",
      healthCheckRating: rating,
    };

    try {
      const createdEntry = await axios.post(
        `${apiBaseUrl}/patients/${id}/entries`,
        newEntry
      );
      entries = entries!.concat(createdEntry.data);
      setEntries(entries);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response!.data);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    }
  };

  return (
    <>
      {error ? <Alert severity="error">{error}</Alert> : <></>}
      <Container
        style={{
          border: "2px dotted",
          padding: "2em 1em 2em 1em",
          marginTop: "1em",
          marginBottom: "1em",
        }}
      >
        <Typography variant="h6" fontWeight={"bold"}>
          New HealthCheck Entry
        </Typography>
        <form onSubmit={submitForm}>
          <FormControl fullWidth>
            <TextField
              style={{ marginTop: "1em" }}
              id="standard-basic"
              label="Description"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDescription(event.target.value);
              }}
            />{" "}
            <br />
            <TextField
              style={{ marginTop: "1em" }}
              type="date"
              value={date}
              label="Date"
              InputLabelProps={{ shrink: true }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDate(event.target.value);
              }}
            ></TextField>
            <br />
            <TextField
              style={{ marginTop: "1em" }}
              id="standard-basic"
              label="Specialist"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setSpecialist(event.target.value);
              }}
            />
          </FormControl>
          <br />
          <FormControl size="medium" fullWidth style={{ marginTop: "2em" }}>
            <InputLabel>Healthcheck Rating</InputLabel>
            <Select
              value={rating}
              label="Healthcheck Rating"
              onChange={handleSelect}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low Risk</MenuItem>
              <MenuItem value={2}>High Risk</MenuItem>
              <MenuItem value={3}>Critical Risk</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="medium" fullWidth style={{ marginTop: "2em" }}>
            <InputLabel>Diagnosis Codes</InputLabel>
            <Select
              value={diagnosisCodes}
              label="Diagnosis Codes"
              multiple
              onChange={handleCodesSelect}
            >
              {fetchedDiagnosisCodes.map((code) => (
                <MenuItem value={code.code} key={code.code}>
                  {code.code}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Container
            style={{
              marginTop: "2em",
              display: "flex",
              justifyContent: "space-between",
              padding: 0,
            }}
          >
            <Button variant="contained" color="error" onClick={handleCancel}>
              cancel
            </Button>
            <Button variant="contained" type="submit">
              add
            </Button>
          </Container>
        </form>
      </Container>
    </>
  );
};

export default NewHealthCheckForm;
