import { Typography } from "@mui/material";
import { Entry } from "../../../types";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntry";
import NewEntryForm from "./NewEntryForm/NewEntryForm";
import { context } from "../context";
import { useEffect, useState } from "react";

const Entries = ({
  entries,
  id,
}: {
  entries: Entry[];
  id: string | undefined;
}) => {
  const [displayedEntries, setDisplayedEntries] = useState<Entry[]>([]);

  useEffect(() => {
    setDisplayedEntries(entries);
  }, [entries]);

  const EntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case "Hospital":
        return <HospitalEntry entry={entry}></HospitalEntry>;
      case "HealthCheck":
        return (
          <HealthCheckEntryComponent entry={entry}></HealthCheckEntryComponent>
        );
      case "OccupationalHealthcare":
        return (
          <OccupationalHealthcareEntryComponent
            entry={entry}
          ></OccupationalHealthcareEntryComponent>
        );
      default:
        break;
    }
  };

  return (
    <context.Provider
      value={{ id, entries: displayedEntries, setEntries: setDisplayedEntries }}
    >
      <NewEntryForm></NewEntryForm>
      <Typography
        variant="h6"
        style={{
          marginBottom: "0.5em",
          fontWeight: "bold",
          paddingTop: "1em",
          alignItems: "center",
        }}
      >
        entries
      </Typography>
      {displayedEntries.map((entry) => {
        return <div key={entry.id}>{EntryDetails(entry)}</div>;
      })}
    </context.Provider>
  );
};

export default Entries;
