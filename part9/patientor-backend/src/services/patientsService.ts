import patientInfo from "../../data/patients";
import {
  nonSensitivePatientEntry,
  Patient,
  newPatient,
  EntryWithoutId,
  Entry,
} from "../types/types";
import { toNewPatient } from "../utils";
import { v1 as uuid } from "uuid";

const patientData: Patient[] = patientInfo.map((patient) => {
  const initializedPatient = toNewPatient(patient) as Patient;
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

const getEntry = (id: string): Patient | undefined => {
  return patientData.find((entry) => entry.id === id);
};

const createPatient = (patient: newPatient): Patient => {
  const id: string = uuid();
  const newPatient = {
    id: id,
    ...patient,
    entries: [],
  };

  patientData.push(newPatient);
  return newPatient;
};

const createEntry = (entry: EntryWithoutId, id: string): Entry => {
  const patient = patientData.find((patient) => patient.id === id);
  const newEntry = {
    id: id,
    ...entry,
  };
  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getEntries,
  createPatient,
  getEntry,
  createEntry,
};
