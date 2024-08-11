import express from "express";
import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getEntries());
});

router.get("/:id", (req, res) => {
  const result = patientsService.getEntry(req.params.id);
  res.send(result);
});

router.post("/", (req, res) => {
  try {
    // Verify that body is transformed into type newPatientEntry
    const newPatient = toNewPatient(req.body);

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
