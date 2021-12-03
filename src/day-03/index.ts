import { partition } from "https://cdn.skypack.dev/lodash";

function flipbits(str: string) {
  return str
    .split("")
    .map((b) => (1 - Number(b)).toString())
    .join("");
}

export function stage1(input: string) {
  const data = input.split("\n");

  const bitCount = data.reduce((acc, curr) => {
    const bits = curr.split("").map(Number);
    bits.forEach((bit, index) => {
      if (bit === 1) {
        acc[index] = (acc[index] ?? 0) + 1;
      } else {
        acc[index] = (acc[index] ?? 0) - 1;
      }
    });

    return acc;
  }, [] as number[]);

  const gammaBin = bitCount.map((bit) => (bit > 1 ? 1 : 0)).join("");
  const epsilonBin = flipbits(gammaBin);

  const gammaDec = parseInt(gammaBin, 2);
  const epsilonDec = parseInt(epsilonBin, 2);
  // let epsilon;

  return gammaDec * epsilonDec;
}

function splitByBit(index: number, arr: number[][]): [number[][], number[][]] {
  return partition(arr, (a: number[]) => a[index] === 1);
}

export function stage2(input: string) {
  const data = input.split("\n").map((line) => line.split("").map(Number));

  let mostCommon = data;
  let leastCommon = data;

  for (let i = 0; i < data[0].length; i++) {
    if (mostCommon.length > 1) {
      const [a, b] = splitByBit(i, mostCommon);
      if (a.length > b.length) {
        mostCommon = a;
      } else if (a.length < b.length) {
        mostCommon = b;
      } else {
        mostCommon = a[0][i] === 1 ? a : b;
      }
    }

    if (leastCommon.length > 1) {
      const [a, b] = splitByBit(i, leastCommon);
      if (a.length > b.length) {
        leastCommon = b;
      } else if (a.length < b.length) {
        leastCommon = a;
      } else {
        leastCommon = a[0][i] === 1 ? b : a;
      }
    }
  }

  const oxygen = parseInt(mostCommon[0].join(""), 2);
  const co2 = parseInt(leastCommon[0].join(""), 2);

  return oxygen * co2;
}
