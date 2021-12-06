type Age = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type LanternfishState = Record<Age, number>;

function createEmptyLanternfishState(): Record<Age, number> {
  return {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
  };
}

function processDay(prevState: LanternfishState) {
  const newState = createEmptyLanternfishState();

  const entries = Object.entries(prevState);

  entries.forEach(([age, count]) => {
    if (age === "0") {
      newState[8] = count;
      newState[6] = count;
    } else {
      newState[(Number(age) - 1) as Age] += count;
    }
  });

  return newState;
}

export function stage1(input: string) {
  const entryState = input.split(",").map(Number) as Age[];

  const DAYS = 80;

  let lanternfishState = createEmptyLanternfishState();

  entryState.forEach((value) => {
    lanternfishState[value]++;
  });

  for (let i = 0; i < DAYS; i++) {
    lanternfishState = processDay(lanternfishState);
  }

  return Object.values(lanternfishState).reduce((a, b) => a + b, 0);
}

export function stage2(input: string) {
  const entryState = input.split(",").map(Number) as Age[];

  const DAYS = 256;

  let lanternfishState = createEmptyLanternfishState();

  entryState.forEach((value) => {
    lanternfishState[value]++;
  });

  for (let i = 0; i < DAYS; i++) {
    lanternfishState = processDay(lanternfishState);
  }

  return Object.values(lanternfishState).reduce((a, b) => a + b, 0);
}
