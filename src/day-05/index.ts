export function stage1(input: string) {
  const lines = input.split("\n").map((line) =>
    line
      .split(/ -> /)
      .map((row) => row.trim().split(",").map(Number))
      .flat()
  );

  const diagonalLines = lines.filter(
    ([x1, y1, x2, y2]) => x1 === x2 || y1 === y2
  );

  const diagram = new Map<string, number>();

  diagonalLines.forEach(([x1, y1, x2, y2]) => {
    const [xStart, xEnd] = x1 < x2 ? [x1, x2] : [x2, x1];
    const [yStart, yEnd] = y1 < y2 ? [y1, y2] : [y2, y1];

    for (let x = xStart; x <= xEnd; x++) {
      for (let y = yStart; y <= yEnd; y++) {
        const key = `${x},${y}`;
        const value = diagram.get(key) ?? 0;
        diagram.set(key, value + 1);
      }
    }
  });

  return [...diagram.values()].filter((value) => value > 1).length;
}

export function stage2(input: string) {
  const lines = input.split("\n").map((line) =>
    line
      .split(/ -> /)
      .map((row) => row.trim().split(",").map(Number))
      .flat()
  );

  const validLines = lines.filter(
    ([x1, y1, x2, y2]) =>
      x1 === x2 || y1 === y2 || Math.abs(x1 - x2) === Math.abs(y1 - y2)
  );

  const diagram = new Map<string, number>();

  validLines.forEach(([x1, y1, x2, y2]) => {
    const [xStart, xEnd] = x1 < x2 ? [x1, x2] : [x2, x1];
    const [yStart, yEnd] = y1 < y2 ? [y1, y2] : [y2, y1];

    if (xStart === xEnd || yStart === yEnd) {
      for (let x = xStart; x <= xEnd; x++) {
        for (let y = yStart; y <= yEnd; y++) {
          const key = `${x},${y}`;
          const value = diagram.get(key) ?? 0;
          diagram.set(key, value + 1);
        }
      }
    } else {
      const distance = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

      const xMultiplier = x1 < x2 ? 1 : -1;
      const yMultiplier = y1 < y2 ? 1 : -1;

      for (let i = 0; i <= distance; i++) {
        const x = x1 + i * xMultiplier;
        const y = y1 + i * yMultiplier;

        const key = `${x},${y}`;

        const value = diagram.get(key) ?? 0;
        diagram.set(key, value + 1);
      }
    }
  });

  return [...diagram.values()].filter((value) => value > 1).length;
}
