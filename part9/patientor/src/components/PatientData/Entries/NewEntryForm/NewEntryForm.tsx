import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import NewHealthCheckForm from "./NewHealthCheckForm";
import { useState } from "react";
import { createFormContext } from "../../context";
import NewOccupationalHealthCareForm from "./NewOccupationalHealthcareForm";

const NewEntryForm = () => {
  const [selectedForm, setSelectedForm] = useState<string>("");

  const handleSelectorChange = (event: SelectChangeEvent) => {
    setSelectedForm(event.target.value as string);
  };

  return (
    <createFormContext.Provider value={setSelectedForm}>
      <FormControl variant="outlined" fullWidth style={{ marginTop: "1em" }}>
        <InputLabel id="form-selector-label">Create new entry</InputLabel>
        <Select
          labelId="form-selector-label"
          value={selectedForm}
          onChange={handleSelectorChange}
          label="Create new entry"
        >
          <MenuItem value="Healthcheck Entry">Healthcheck Entry</MenuItem>
          <MenuItem value="Hospital Entry">Hospital Entry</MenuItem>
          <MenuItem value="Occupational Healthcare Entry">
            Occupational Healthcare Entry
          </MenuItem>
        </Select>
      </FormControl>
      {selectedForm === "Healthcheck Entry" && (
        <NewHealthCheckForm></NewHealthCheckForm>
      )}
      {selectedForm === "Hospital Entry" && <></>}
      {selectedForm === "Occupational Healthcare Entry" && (
        <NewOccupationalHealthCareForm></NewOccupationalHealthCareForm>
      )}
    </createFormContext.Provider>
  );
};

export default NewEntryForm;
