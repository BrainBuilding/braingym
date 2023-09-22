import { useWindowDimensions } from "hooks/dom";
import { useMemo } from "react";

export const useCubeSizes = () => {
  const { height, width } = useWindowDimensions();

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
