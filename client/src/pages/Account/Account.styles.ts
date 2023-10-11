import styled from "styled-components";
import { backgroundColors } from "styles";


export const AccountStyled = styled.div`
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background: repeating-linear-gradient(
      -45deg,
      ${backgroundColors.color1} 0%,
      ${backgroundColors.color1} 20%,
      ${backgroundColors.color2} 20%,
      ${backgroundColors.color2} 40%,
      ${backgroundColors.color1} 40%,
      ${backgroundColors.color1} 60%,
      ${backgroundColors.color2} 60%,
      ${backgroundColors.color2} 80%,
      ${backgroundColors.color1} 80%,
      ${backgroundColors.color1} 100%
    );

  .form-div {
    display: flex;
    flex-direction: column;


    .inputs {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

  }

`;