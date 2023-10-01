import { useWindowDimensions } from "hooks/dom";
import { useCallback, useMemo } from "react";
import { TBoardSize } from "./AlphabetBoard";

export const useCubeSizes = (size: TBoardSize) => {
  const { height: originalHeight, width: originalWidth } =
    useWindowDimensions();

  const sizeRatio = size === "small" ? 0.5 : 1;

  const height = originalHeight * sizeRatio;
  const width = originalWidth * sizeRatio;

  const sizes = useMemo(() => {
    const ratio = width / height;

    const rowsCount = Math.ceil(Math.sqrt(39 / ratio));
    const colCount = Math.ceil(rowsCount * ratio);
    const cubeSize = Math.min(
      height / rowsCount - rowsCount * 2.5,
      width / colCount - colCount * 2.5
    );

    return { rowsCount, colCount, cubeSize };
  }, [height, width]);

  return sizes;
};

export const usePlaySound = () => {
  return useCallback((letterKey: string) => {
    const audio = new Audio(`/sounds/alphabets/armenian/${letterKey}.mp3`);

    return () => audio.play();
  }, []);
};
