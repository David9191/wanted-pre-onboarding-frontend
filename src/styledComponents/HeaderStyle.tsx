import { styled } from 'styled-components';
import { HeadingOne } from './CommonStyle';

export const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 70px;
  margin-bottom: 50px;

  background: linear-gradient(
    90deg,
    rgba(36, 224, 188, 1) 0%,
    rgba(67, 139, 255, 1) 60%,
    rgba(44, 91, 242, 1) 100%
  );
`;

export const HeadingOneHeader = styled(HeadingOne)`
  margin: 0;

  font-size: 20px;

  color: #242424;
`;
