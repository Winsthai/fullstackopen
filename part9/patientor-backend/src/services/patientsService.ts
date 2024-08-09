import patientInfo from "../../data/patients";
import {
  newPatientEntry,
  nonSensitivePatientEntry,
  patientEntry,
} from "../types/types";
import toNewPatientEntry from "../utils";
import { v1 as uuid } from "uuid";

const patientData: patientEntry[] = patientInfo.map((patient) => {
  const initializedPatient = toNewPatientEntry(patient) as patientEntry;
  initializedPatient.id = patient.id;
  return initializedPatient;
});

const getEntries = (): nonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const createPatient = (patient: newPatientEntry): patientEntry => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
  };

  patientData.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  createPatient,
};
