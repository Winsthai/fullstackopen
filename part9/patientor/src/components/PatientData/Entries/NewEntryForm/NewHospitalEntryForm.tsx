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
import { Diagnosis, EntryWithoutId } from "../../../../types";
import { context } from "../../context";
import { createFormContext } from "../../context";

const NewHospitalEntryForm = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [fetchedDiagnosisCodes, setFetchedDiagnosisCodes] = useState<
    Diagnosis[]
  >([]);
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  const [error, setError] = useState("");

  const { id, setEntries } = useContext(context);
  let { entries } = useContext(context);

  const setSelectedForm = useContext(createFormContext);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/diagnoses`)
      .then((response) => setFetchedDiagnosisCodes(response.data));
  }, []);

  const handleCodesSelect = (event: SelectChangeEvent<string[]>) => {
    setDiagnosisCodes(event.target.value as string[]);
  };

  const handleCancel = () => {
    // Cancel the form
    setSelectedForm("");
  };

  const submitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: EntryWithoutId = {
      date,
      description,
      specialist,
      discharge: { date: dischargeDate, criteria },
      type: "Hospital",
    };

    if (diagnosisCodes) {
      newEntry.diagnosisCodes = diagnosisCodes;
    }

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
          New Hospital Entry
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
          <Typography sx={{ marginTop: "1em" }} variant="body1">
            Discharge:
          </Typography>
          <FormControl fullWidth>
            <TextField
              style={{ marginTop: "1em" }}
              type="date"
              value={dischargeDate}
              label="Date"
              InputLabelProps={{ shrink: true }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setDischargeDate(event.target.value);
              }}
            ></TextField>
            <TextField
              style={{ marginTop: "1em" }}
              id="standard-basic"
              label="Criteria"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCriteria(event.target.value);
              }}
            />
          </FormControl>
          <br />
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

export default NewHospitalEntryForm;
