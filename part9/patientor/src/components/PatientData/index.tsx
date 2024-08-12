import { Patient } from "../../types";
import Entries from "./Entries/Entries";
import { Container, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { apiBaseUrl } from "../../constants";

const PatientDataPage = () => {
  const [patient, setPatient] = useState<Patient>();

  const { id } = useParams();

  useEffect(() => {
    axios.get(`${apiBaseUrl}/patients/${id}`).then((response) => {
      setPatient(response.data);
    });
  }, [id]);

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
      <Typography>ssn: {patient.ssn}</Typography>
      <Typography>born: {patient.dateOfBirth}</Typography>
      <Typography>occupation: {patient.occupation}</Typography>
      <Entries entries={patient.entries} id={id}></Entries>
    </Container>
  );
};

export default PatientDataPage;
