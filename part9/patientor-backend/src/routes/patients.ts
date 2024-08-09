import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getEntries());
});

router.post("/", (req, res) => {
  try {
    // Verify that body is transformed into type newPatientEntry
    const newPatient = toNewPatientEntry(req.body);

    const addedPatient = patientsService.createPatient(newPatient);
    res.json(addedPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
