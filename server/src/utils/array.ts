import shuffle from "lodash/shuffle";

export const getRandomItem = <T extends any>(items: T[]) => {
  const item = items[Math.floor(Math.random() * items.length)];

  return item;
};

export const getRandomElementsFromArray = <T extends unknown>(
  array: T[],
  fromFirstX: number,
  selectRandomY: number
): T[] => {
  return shuffle(array.slice(fromFirstX - selectRandomY, fromFirstX));
};
