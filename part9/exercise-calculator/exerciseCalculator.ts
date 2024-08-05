interface DailyExerciseValues {
  dailyExerciseHours: number[];
  target: number;
}

interface exerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseDailyExerciseArguments = (args: string[]): DailyExerciseValues => {
  let dailyExerciseArray: number[] = [];

  args.slice(2).forEach((val) => {
    if (isNaN(Number(val))) {
      throw new Error("Provided values were not numbers!");
    }
    dailyExerciseArray = dailyExerciseArray.concat(Number(val));
  });

  const target = dailyExerciseArray[dailyExerciseArray.length - 1];
  dailyExerciseArray.pop();

  return {
    dailyExerciseHours: dailyExerciseArray,
    target: target,
  };
};

// dailyExerciseHours = array of exercise hours per day
// target = the average exercise hours the person wants to achieve
const calculateExercises = (
  dailyExerciseHours: number[],
  target: number
): exerciseData => {
  const periodLength = dailyExerciseHours.length;
  const average = dailyExerciseHours.reduce((a, b) => a + b) / periodLength;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = "great job";
  } else if (average >= target - 1) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 1;
    ratingDescription = "more exercise is needed";
  }

  return {
    periodLength: periodLength,
    trainingDays: dailyExerciseHours.filter((day) => day !== 0).length,
    success: average >= target,
    rating: rating,
    ratingDescription: ratingDescription,
    target: target,
    average: average,
  };
};

try {
  const { dailyExerciseHours, target } = parseDailyExerciseArguments(
    process.argv
  );

  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
