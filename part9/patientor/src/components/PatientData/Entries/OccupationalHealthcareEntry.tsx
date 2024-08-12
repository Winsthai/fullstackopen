import { Container, Typography } from "@mui/material";
import { OccupationalHealthcareEntry } from "../../../types";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { EntryContainer } from "./EntryContainer";

const OccupationalHealthcareEntryComponent = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  return (
    <Container>
      <EntryContainer>
        <Typography>
          {entry.date} <AssignmentIndIcon></AssignmentIndIcon>{" "}
          <b>{entry.employerName}</b>
        </Typography>
        <Typography fontStyle={"italic"}>{entry.description}</Typography>
        {entry.sickLeave ? (
          <Typography>
            sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </Typography>
        ) : (
          <></>
        )}
        <Typography>diagnose by {entry.specialist}</Typography>
      </EntryContainer>
    </Container>
  );
};

export default OccupationalHealthcareEntryComponent;
