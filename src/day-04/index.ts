type BingoCard = number[][];

function parseBingoCardRow(row: string): number[] {
  return row
    .trim()
    .split(/\s+/)
    .map((num) => parseInt(num));
}

function parseInput(input: string) {
  const [rawDrawn, ...rawBingoCards] = input.split("\n\n");

  const allDrawnNumbers = rawDrawn.split(",").map((num) => parseInt(num));

  const bingoCards: BingoCard[] = rawBingoCards
    .slice(1)
    .map((card) => card.split("\n").map(parseBingoCardRow));

  return [allDrawnNumbers, bingoCards] as [number[], BingoCard[]];
}

function isWinningCard(card: BingoCard, drawnNumbers: number[]): boolean {
  // check drawn numbers in rows
  if (
    card.some((row) => row.every((number) => drawnNumbers.includes(number)))
  ) {
    return true;
  }

  // check drawnNumbers in columns
  for (let i = 0; i <= card[0].length; i++) {
    const column = card.map((row) => row[i]);
    if (column.every((number) => drawnNumbers.includes(number))) {
      return true;
    }
  }

  return false;
}

function findWinningCard(
  cards: BingoCard[],
  allDrawnNumbers: number[]
): [BingoCard, number[]] {
  for (let i = 0; i < allDrawnNumbers.length; i++) {
    const drawnNumbers = allDrawnNumbers.slice(0, i);
    const winningCard = cards.find((card) => isWinningCard(card, drawnNumbers));

    if (winningCard) {
      return [winningCard, drawnNumbers];
    }
  }

  throw new Error("No winning card found");
}

export function stage1(input: string) {
  const [allDrawnNumbers, bingoCards] = parseInput(input);

  const [winningCard, winningNumbers] = findWinningCard(
    bingoCards,
    allDrawnNumbers
  );

  const nonCheckedSum = winningCard
    .flat()
    .filter((number) => !winningNumbers.includes(number))
    .reduce((acc, number) => acc + number);

  const lastDrawn = winningNumbers[winningNumbers.length - 1];

  return nonCheckedSum * lastDrawn;
}

function findLastWinningCard(
  cards: BingoCard[],
  allDrawnNumbers: number[]
): [BingoCard, number[]] {
  for (let i = allDrawnNumbers.length; i > 0; i--) {
    const drawnNumbers = allDrawnNumbers.slice(0, i);
    const nonWinningCard = cards.findLast(
      (card) => !isWinningCard(card, drawnNumbers)
    );

    if (nonWinningCard) {
      return [nonWinningCard, allDrawnNumbers.slice(0, i + 1)];
    }
  }

  throw new Error("WTF");
}

export function stage2(input: string) {
  const [allDrawnNumbers, bingoCards] = parseInput(input);

  const [lastWinning, winningNumbers] = findLastWinningCard(
    bingoCards,
    allDrawnNumbers
  );

  const nonCheckedSum = lastWinning
    .flat()
    .filter((number) => !winningNumbers.includes(number))
    .reduce((acc, number) => acc + number);

  const lastDrawn = winningNumbers[winningNumbers.length - 1];

  return nonCheckedSum * lastDrawn;
}
