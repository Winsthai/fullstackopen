import patientData from "../../data/patients";
import { nonSensitivePatientEntry } from "../types/types";

const getEntries = (): nonSensitivePatientEntry[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getEntries,
};
