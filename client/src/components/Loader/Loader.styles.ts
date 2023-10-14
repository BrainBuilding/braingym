import styled from "styled-components";

export const LoaderStyled = styled.div`
  background-image: url(/images/loader.gif);
  background-size: contain;
  background-repeat: no-repeat;
  width: min(20vw, 20vh);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  aspect-ratio: 1;
`;
