export function stage1(input: string) {
  const crabPositions = input.split(",").map(Number);

  const median = crabPositions.sort((a, b) => a - b)[
    Math.floor(crabPositions.length / 2)
  ];

  const totalDistance = crabPositions.reduce(
    (acc, curr) => acc + Math.abs(curr - median),
    0
  );

  return totalDistance;
}

function sumOfSeries(length: number) {
  return length * ((length + 1) / 2);
}

export function stage2(input: string) {
  const crabPositions = input.split(",").map(Number);

  const start = Math.min(...crabPositions);
  const end = Math.max(...crabPositions);

  const fuel = [];

  for (let i = start; i < end; i++) {
    const totalFuel = crabPositions
      .map((position) => sumOfSeries(Math.abs(position - i)))
      .reduce((acc, curr) => acc + curr, 0);

    fuel.push(totalFuel);
  }

  return Math.min(...fuel);
}
