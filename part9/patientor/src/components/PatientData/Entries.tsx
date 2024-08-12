import { Typography } from "@mui/material";
import { Entry } from "../../types";
import HospitalEntry from "./HospitalEntry";
import HealthCheckEntryComponent from "./HealthCheckEntry";
import OccupationalHealthcareEntryComponent from "./OccupationalHealthcareEntry";

const Entries = ({ entries }: { entries: Entry[] }) => {
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
    <>
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
      {entries.map((entry) => {
        return <div key={entry.id}>{EntryDetails(entry)}</div>;
      })}
    </>
  );
};

export default Entries;
