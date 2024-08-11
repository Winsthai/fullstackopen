import { Patient } from "../../types";
import { Container, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";

const PatientDataPage = ({
  patient,
}: {
  patient: Patient | null | undefined;
}) => {
  if (!patient) {
    return <>Patient ID does not exist</>;
  }
  return (
    <Container>
      <Typography
        variant="h5"
        style={{
          marginBottom: "0.5em",
          fontWeight: "bold",
          paddingTop: "1em",
          alignItems: "center",
        }}
      >
        {patient.name}
        {patient.gender === "male" ? (
          <MaleIcon
            fontSize="medium"
            style={{ paddingLeft: "0.2em" }}
          ></MaleIcon>
        ) : patient.gender === "female" ? (
          <FemaleIcon style={{ paddingLeft: "0.2em" }}></FemaleIcon>
        ) : (
          <></>
        )}
      </Typography>
      <Typography>born: {patient.dateOfBirth}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
    </Container>
  );
};

export default PatientDataPage;
