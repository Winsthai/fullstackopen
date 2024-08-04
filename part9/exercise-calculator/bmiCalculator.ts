/* interface ExerciseValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
}; */

// Takes height in centimeters and weight in kilograms
const calculateBmi = (height: number, weight: number): string => {
  const BMI = weight / (height / 100) ** 2;

  if (BMI < 18.5) {
    return "Abnormal (underweight)";
  } else if (BMI < 25) {
    return "Normal (healthy weight)";
  } else {
    return "Abnormal (overweight)";
  }
};

/* try {
  const { height, weight } = parseArguments(process.argv);

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
} */

export default calculateBmi;
