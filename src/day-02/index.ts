type Direction = "forward" | "up" | "down";

export function stage1(input: string) {
  const coordinates = input.split("\n").map((line) => {
    const [direction, distance] = line.split(" ");
    return [direction, parseInt(distance)];
  }) as Array<[Direction, number]>;

  let x = 0;
  let y = 0;

  coordinates.forEach(([direction, distance]) => {
    switch (direction) {
      case "up":
        y -= distance;
        break;
      case "down":
        y += distance;
        break;
      case "forward":
        x += distance;
        break;
    }
  });

  return x * y;
}

export function stage2(input: string) {
  const coordinates = input.split("\n").map((line) => {
    const [direction, distance] = line.split(" ");
    return [direction, parseInt(distance)];
  }) as Array<[Direction, number]>;

  let x = 0;
  let y = 0;
  let aim = 0;

  coordinates.forEach(([direction, distance]) => {
    switch (direction) {
      case "up":
        aim -= distance;
        break;
      case "down":
        aim += distance;
        break;
      case "forward":
        x += distance;
        y += aim * distance;
        break;
    }
  });

  return x * y;
}
