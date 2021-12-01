export function stage1(input: string) {
  const values = input.split("\n").map(Number);
  let increasedCount = 0;

  values.forEach((value, index) => {
    const previousValue = values[index - 1];
    if (previousValue && value > previousValue) {
      increasedCount++;
    }
  });

  return increasedCount;
}

export function stage2(input: string) {
  const values = input.split("\n").map(Number);

  const threeMeasurements: number[] = [];

  for (let i = 1; i < values.length - 1; i++) {
    threeMeasurements.push(values[i - 1] + values[i] + values[i + 1]);
  }

  let increasedCount = 0;

  threeMeasurements.forEach((value, index) => {
    const previousValue = threeMeasurements[index - 1];
    if (previousValue && value > previousValue) {
      increasedCount++;
    }
  });

  return increasedCount;
}
