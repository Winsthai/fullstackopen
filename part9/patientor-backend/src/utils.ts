import {
  discharge,
  Entry,
  HealthCheckRating,
  newPatient,
  sickLeave,
} from "./types/types";
import { Gender } from "./types/types";
import { EntryWithoutId } from "./types/types";
import { diagnosisEntry } from "./types/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseString = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error("name, ssn, or occupation is not of type string");
  }

  return string;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  return entries as Entry[];
};

export const toNewPatient = (object: unknown): newPatient => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object &&
    "entries" in object
  ) {
    return {
      name: parseString(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation),
      entries: parseEntries(object.entries),
    };
  }

  throw new Error("Incorrect data: a field missing");
};

const parseDescription = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error("Description is not of type string");
  }

  return string;
};

const parseSpecialist = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error("Specialist is not of type string");
  }

  return string;
};

const parseDiagnosisCodes = (
  object: unknown
): Array<diagnosisEntry["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<diagnosisEntry["code"]>;
  }

  return object.diagnosisCodes as Array<diagnosisEntry["code"]>;
};

const parseDischarge = (object: unknown): discharge => {
  if (
    !object ||
    typeof object !== "object" ||
    !("date" in object) ||
    !("criteria" in object) ||
    !isString(object.criteria) ||
    !isString(object.date) ||
    !isDate(object.date)
  ) {
    throw new Error("Discharge is not of the correct type");
  }

  return {
    date: object.date,
    criteria: object.criteria,
  };
};

const parseEmployerName = (string: unknown): string => {
  if (!isString(string)) {
    throw new Error("EmployerName is not of type string");
  }

  return string;
};

const parseSickLeave = (object: unknown): sickLeave => {
  if (
    !object ||
    typeof object !== "object" ||
    !("startDate" in object) ||
    !("endDate" in object) ||
    !isString(object.startDate) ||
    !isDate(object.startDate) ||
    !isString(object.endDate) ||
    !isDate(object.endDate)
  ) {
    throw new Error("sickLeave is not of the correct type");
  }

  return {
    startDate: object.startDate,
    endDate: object.endDate,
  };
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((v) => Number(v))
    .includes(param);
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const parseHealthCheckRating = (
  healthCheckRating: unknown
): HealthCheckRating => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error("Incorrect or missing gender: " + healthCheckRating);
  }
  return healthCheckRating;
};

export const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "description" in object &&
    "date" in object &&
    "specialist" in object &&
    "type" in object
  ) {
    switch (object.type) {
      case "Hospital":
        if ("discharge" in object && "diagnosisCodes" in object) {
          return {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            type: "Hospital",
            diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
            discharge: parseDischarge(object.discharge),
          };
        } else if ("discharge" in object) {
          return {
            description: parseDescription(object.description),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            type: "Hospital",
            discharge: parseDischarge(object.discharge),
          };
        }

        throw new Error(
          "Incorrect data for type Hospital Entry: required discharge field missing"
        );
      case "OccupationalHealthcare":
        if ("employerName" in object) {
          if ("diagnosisCodes" in object && "sickLeave" in object) {
            return {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              type: "OccupationalHealthcare",
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              employerName: parseEmployerName(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave),
            };
          } else if ("diagnosisCodes" in object) {
            return {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              type: "OccupationalHealthcare",
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              employerName: parseEmployerName(object.employerName),
            };
          } else if ("sickLeave" in object) {
            return {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              type: "OccupationalHealthcare",
              sickLeave: parseSickLeave(object.sickLeave),
              employerName: parseEmployerName(object.employerName),
            };
          } else {
            return {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              type: "OccupationalHealthcare",
              employerName: parseEmployerName(object.employerName),
            };
          }
        }

        throw new Error(
          "Incorrect data for OccupationalHealthcareEntry: employerName field missing"
        );
      case "HealthCheck":
        if ("healthCheckRating" in object) {
          if ("diagnosisCodes" in object) {
            return {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              type: "HealthCheck",
              diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
              healthCheckRating: parseHealthCheckRating(
                object.healthCheckRating
              ),
            };
          } else {
            return {
              description: parseDescription(object.description),
              date: parseDate(object.date),
              specialist: parseSpecialist(object.specialist),
              type: "HealthCheck",
              healthCheckRating: parseHealthCheckRating(
                object.healthCheckRating
              ),
            };
          }
        }

        throw new Error(
          "Incorrect data for HealthCheck: healthCheckRating field missing"
        );
      default:
        throw new Error('Entry is missing a valid "type" value');
    }
  }

  throw new Error("Incorrect data: a field missing");
};
