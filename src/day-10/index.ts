type OpeningBrace = "(" | "[" | "{" | "<";
type ClosingBrace = ")" | "]" | "}" | ">";

const braces: Record<OpeningBrace, ClosingBrace> = {
  "(": ")",
  "[": "]",
  "{": "}",
  "<": ">",
};

export function stage1(input: string) {
  const subsystem = input.split("\n");

  const score: Record<ClosingBrace, number> = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137,
  };

  let totalScore = 0;

  subsystem.forEach((line) => {
    const openBraces: OpeningBrace[] = [];

    line.split("").forEach((char: string) => {
      if (braces[char as OpeningBrace]) {
        openBraces.push(char as OpeningBrace);
      } else {
        const lastOpenBrace = openBraces.pop();

        if (lastOpenBrace && braces[lastOpenBrace] !== char) {
          totalScore += score[char as ClosingBrace];
        }
      }
    });
  });

  return totalScore;
}

export function stage2(input: string) {
  const subsystem = input.split("\n");

  const score: Record<ClosingBrace, number> = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4,
  };

  const calculateLineScore = (closingBraces: ClosingBrace[]) => {
    return closingBraces.reduceRight((acc, char) => {
      acc *= 5;
      return acc + score[char];
    }, 0);
  };

  const scores = [] as number[];

  subsystem.forEach((line) => {
    const openBraces: OpeningBrace[] = [];

    let isValid = true;

    line.split("").forEach((char: string) => {
      if (braces[char as OpeningBrace]) {
        openBraces.push(char as OpeningBrace);
      } else {
        const lastOpenBrace = openBraces.pop();
        if (lastOpenBrace && braces[lastOpenBrace] !== char) {
          isValid = false;
        }
      }
    });

    if (isValid) {
      const missingClosingBraces: ClosingBrace[] = openBraces.map(
        (char) => braces[char]
      );

      scores.push(calculateLineScore(missingClosingBraces));
    }
  });

  const middleScore = scores.sort((a, b) => a - b)[
    Math.ceil(scores.length / 2) - 1
  ];

  return middleScore;
}
