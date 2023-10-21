import { styled } from "styled-components";
import { colors } from "styles";

export const EditableAvatarStyled = styled.div`
  .image-wrapper {
    width: 200px;
    height: 200px;
    position: relative;

    .avatar {
      width: 100%;
      height: 100%;
    }

    .upload-image {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 40px;
      background: rgb(0, 0, 0, 0.5);

      &:hover {
        background: rgb(0, 0, 0, 0.7);
      }

      .upload-input {
        position: absolute;
        width: 100%;
        height: 100%;
        cursor: pointer;
        opacity: 0;
        top: 0;
      }

      .change-photo {
        width: 100%;
        height: 100%;
        pointer-events: none;
        color: ${colors.white};
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
`;
