import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const {
    query: { height, weight },
  } = req;

  if ((!height && !weight) || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const bmi = calculateBmi(Number(height), Number(weight));

  return res.json({
    weight: weight,
    height: height,
    bmi: bmi,
  });
});

app.post("/exercises", express.json(), (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({
      error: "parameters missing",
    });
  } else if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    !daily_exercises.every((value) => typeof value === "number")
  ) {
    return res.status(400).json({
      error: "malformatted parameters",
    });
  }

  const exerciseStats = calculateExercises(daily_exercises, Number(target));

  return res.json(exerciseStats);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
