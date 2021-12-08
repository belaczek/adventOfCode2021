export function stage1(input: string) {
  const digits = input
    .split("\n")
    .map((row) =>
      row
        .split("|")[1]
        .split(" ")
        .map((digit) => digit.trim())
    )
    .flat();

  const validLenghts = [2, 3, 4, 7];
  return digits.filter((digit) => validLenghts.includes(digit.length)).length;
}

export function stage2(input: string) {
  const inputValues = input.split("\n").map((row) => {
    const [key, digits] = row.split("|");

    return [
      key.split(" ").map((digit) => digit.trim()),
      digits
        .split(" ")
        .map((digit) => digit.trim())
        .filter((digit) => digit.length > 0),
    ];
  });

  let sum = 0;

  inputValues.forEach(([key, digits]) => {
    const letterOccurence: Record<string, number> = {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      f: 0,
      g: 0,
    };

    key.forEach((digit) => {
      digit.split("").forEach((letter) => {
        letterOccurence[letter]++;
      });
    });

    const one = key.find((digit) => digit.length === 2)!.split("");
    const seven = key.find((digit) => digit.length === 3)!.split("");
    const four = key.find((digit) => digit.length === 4)!.split("");

    const a = Object.entries(letterOccurence).find(
      ([letter, occurence]) =>
        occurence === 8 &&
        !one.includes(letter) &&
        !four.includes(letter) &&
        seven.includes(letter)
    )![0];

    const b = Object.entries(letterOccurence).find(
      ([letter, occurence]) =>
        occurence === 6 && four.includes(letter) && !seven.includes(letter)
    )![0];

    const c = Object.entries(letterOccurence).find(
      ([letter, occurence]) => occurence === 8 && one.includes(letter)
    )![0];

    const d = Object.entries(letterOccurence).find(
      ([letter, occurence]) =>
        occurence === 7 && four.includes(letter) && !seven.includes(letter)
    )![0];

    const e = Object.entries(letterOccurence).find(
      ([letter, occurence]) =>
        occurence === 4 &&
        !one.includes(letter) &&
        !four.includes(letter) &&
        !seven.includes(letter)
    )![0];

    const f = Object.entries(letterOccurence).find(
      ([letter, occurence]) => occurence === 9 && one.includes(letter)
    )![0];

    const g = Object.entries(letterOccurence).find(
      ([letter, occurence]) =>
        occurence === 7 &&
        !one.includes(letter) &&
        !four.includes(letter) &&
        !seven.includes(letter)
    )![0];

    const realDigits: string[] = [];

    const matchByLetters = (letters: string[], digit: string) => {
      const digitChars = digit.split("");
      return (
        digitChars.length === letters.length &&
        letters.every((letter) => digitChars.includes(letter))
      );
    };

    digits.forEach((digit) => {
      if (digit.length === 2) {
        realDigits.push("1");
      } else if (digit.length === 3) {
        realDigits.push("7");
      } else if (digit.length === 4) {
        realDigits.push("4");
      } else if (digit.length === 7) {
        realDigits.push("8");
      } else if (matchByLetters([a, c, d, g, e], digit)) {
        realDigits.push("2");
      } else if (matchByLetters([a, c, d, f, g], digit)) {
        realDigits.push("3");
      } else if (matchByLetters([a, b, d, f, g], digit)) {
        realDigits.push("5");
      } else if (matchByLetters([a, b, d, e, f, g], digit)) {
        realDigits.push("6");
      } else if (matchByLetters([a, b, c, d, f, g], digit)) {
        realDigits.push("9");
      } else if (matchByLetters([a, b, c, e, f, g], digit)) {
        realDigits.push("0");
      } else {
        throw new Error("No match for " + digit);
      }
    });

    sum += Number(realDigits.join(""));
  });

  return sum;
}
