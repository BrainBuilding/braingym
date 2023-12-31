import { styled } from "styled-components";
import { colors, fontSizes, spaces } from "styles";

export const RankListStyled = styled.div`
  margin-top: ${spaces.xl};

  .game-name {
    font-size: ${fontSizes.xl};
    margin-bottom: ${spaces.lg};
    padding-left: ${spaces.lg};
  }

  .rank-list {
    .list-item {
      display: flex;
      height: 40px;
      align-items: center;
      background: ${colors.blueLight};
      padding: ${spaces.lg};

      &:nth-child(odd) {
        background: ${colors.blueXLight};
      }

      &:nth-child(1) {
        background: ${colors.yellow};
      }

      div {
        flex: 1;
        margin-right: ${spaces.md};
      }

      .rank-position {
        max-width: 20px;

        img {
          width: 100%;
        }
      }

      .points {
        max-width: 20px;
      }

      .profile-name {
        max-width: 250px;
      }
    }
  }
`;
