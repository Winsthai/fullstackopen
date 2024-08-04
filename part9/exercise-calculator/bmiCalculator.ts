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

console.log(calculateBmi(180, 74));
