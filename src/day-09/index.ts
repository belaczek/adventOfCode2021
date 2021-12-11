export function stage1(input: string) {
  const heightmap = input.split("\n").map((row) => row.split("").map(Number));
  const lowPoints = [];

  const isLowerThanAdjacent = (x: number, y: number) => {
    const adjacent = [
      //left
      heightmap[y][x - 1],
      //right
      heightmap[y][x + 1],
      //bottom
      heightmap[y - 1]?.[x],
      //top
      heightmap[y + 1]?.[x],
    ].filter((n) => n !== undefined);

    return heightmap[y][x] < Math.min(...adjacent);
  };

  for (let y = 0; y < heightmap.length; y++) {
    const row = heightmap[y];

    for (let x = 0; x < row.length; x++) {
      if (isLowerThanAdjacent(x, y)) {
        lowPoints.push(row[x]);
      }
    }
  }

  return lowPoints.map((p) => p + 1).reduce((a, b) => a + b);
}

type Coordinate = [number, number];
export function stage2(input: string) {
  const heightmap = input.split("\n").map((row) => row.split("").map(Number));

  // map of coordinates by their low points
  const basinSize = new Map<string, number>();

  const findBasin = (x: number, y: number): Coordinate => {
    const lowestAdjacent = [
      //left
      [x - 1, y],
      //right
      [x + 1, y],
      //bottom
      [x, y - 1],
      //top
      [x, y + 1],
    ].reduce((acc, [x, y]) => {
      const point = heightmap[y]?.[x];

      if (point !== undefined) {
        if (!acc) {
          return [x, y] as Coordinate;
        }
        if (point < heightmap[acc[1]]?.[acc[0]]) {
          return [x, y] as Coordinate;
        }
      }
      return acc;
    }, null as Coordinate | null);

    if (
      lowestAdjacent !== null &&
      heightmap[lowestAdjacent[1]][lowestAdjacent[0]] < heightmap[y][x]
    ) {
      return findBasin(lowestAdjacent[0], lowestAdjacent[1]);
    }

    return [x, y];
  };

  for (let y = 0; y < heightmap.length; y++) {
    const row = heightmap[y];

    for (let x = 0; x < row.length; x++) {
      const point = heightmap[y][x];
      if (point === 9) {
        continue;
      } else {
        const coordinate = findBasin(x, y);
        const key = JSON.stringify(coordinate);
        const size = basinSize.get(key) || 0;
        basinSize.set(key, size + 1);
      }
    }
  }

  const threeLargestBasins = Array.from(basinSize.values())
    .sort((a, b) => a - b)
    // slice three last items of an array
    .slice(-3);

  return threeLargestBasins.reduce((a, b) => a * b);
}
