export function shuffle<T extends any>(array: T[]) {
  let currentIndex = array.length;
  let randomIndex: number;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const getRandomItem = <T extends any>(items: T[]) => {
  const item = items[Math.floor(Math.random() * items.length)];

  return item;
};
