import diagnosesData from "../../data/diagnoses";
import { diagnosisEntry } from "../types/types";

const getEntries = (): diagnosisEntry[] => {
  return diagnosesData;
};

export default {
  getEntries,
};
