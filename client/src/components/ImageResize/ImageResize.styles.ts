import styled from "styled-components";
import { spaces } from "styles";

type TProps = {
  uploadedImageAspect: number;
};

export const ImageResizeStyled = styled.div<TProps>`
  position: absolute;
  background: rgb(0, 0, 0, 0.9);
  top: 0;
  left: 0;
  padding: ${spaces.xl};
  overflow: hidden;
  width: 100%;
  height: 100%;
  z-index: 10;

  .crop-wrapper {
    display: flex;
  }

  .ReactCrop {
    max-width: min(50vw, 50vh);
    max-height: ${({ uploadedImageAspect }) =>
      `calc(min(50vw, 50vh) / ${uploadedImageAspect})`};
    width: 100%;
    height: 100%;
    margin-right: ${spaces.xl};
  }

  .preview-canvas {
    width: calc(min(50vw, 50vh) - 24px) !important;
    height: calc(min(50vw, 50vh) - 24px) !important;
    max-width: 200px !important;
    max-height: 200px !important;
  }

  .buttons-wrapper {
    display: flex;
    margin-top: ${spaces.lg};

    .button:first-child {
      margin-right: ${spaces.lg};
    }
  }
`;
