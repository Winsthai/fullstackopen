interface exerciseData {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
