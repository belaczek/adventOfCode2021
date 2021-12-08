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

export function stage2(input: string) {
  const crabPositions = input.split(",").map(Number);

  const start = Math.min(...crabPositions);
  const end = Math.max(...crabPositions);

  const fuel = [];

  for (let i = start; i < end; i++) {
    const totalFuel = crabPositions
      .map((position) => {
        const diff = Math.abs(position - i);

        // Calculate sum of arithmetic series
        const fuelConsumtion = diff * ((diff + 1) / 2);
        return fuelConsumtion;
      })
      .reduce((acc, curr) => acc + curr, 0);

    fuel.push(totalFuel);
  }

  return Math.min(...fuel);
}
