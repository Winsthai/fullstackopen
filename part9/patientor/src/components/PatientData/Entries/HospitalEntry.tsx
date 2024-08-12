import { Container, Typography } from "@mui/material";
import { HospitalEntry } from "../../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { EntryContainer } from "./EntryContainer";

const HospitalEntryComponent = ({ entry }: { entry: HospitalEntry }) => {
  return (
    <Container>
      <EntryContainer>
        <Typography>
          {entry.date} <LocalHospitalIcon></LocalHospitalIcon>
        </Typography>
        <Typography fontStyle={"italic"}>{entry.description}</Typography>
        <Typography>
          discharged: {entry.discharge.date}: {entry.discharge.criteria}
        </Typography>
        <Typography>diagnose by {entry.specialist}</Typography>
      </EntryContainer>
    </Container>
  );
};

export default HospitalEntryComponent;
