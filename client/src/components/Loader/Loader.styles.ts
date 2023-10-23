import styled from "styled-components";

export const LoaderStyled = styled.div`
  --size: min(50vw, 50vh);

  @keyframes example {
    0% {
      transform: scaleX(-1);
      left: 0;
      top: 0;
    }
    25% {
      top: 10%;
    }
    49% {
      transform: scaleX(-1);
    }
    50% {
      transform: scaleX(1);
      left: calc(100% - var(--size));
      top: 0;
    }
    75% {
      top: 10%;
    }
    99% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(-1);
      top: 0;
      left: 0;
    }
  }

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;

  .flying-box {
    background-image: url(/images/loader2.gif);
    background-size: contain;
    background-repeat: no-repeat;
    width: var(--size);
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    aspect-ratio: 1;
    max-width: 300px;

    animation-name: example;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
`;
