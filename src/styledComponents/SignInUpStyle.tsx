import { styled } from 'styled-components';

/**
 * BLOCK STYLE
 */
export const SignInUpBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 6px;

  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
export const SignInUpMainContainer = styled.div`
  margin: 70px 80px;
`;

/**
 * HEADING
 */
export const HeadingOne = styled.h1`
  margin-bottom: 40px;

  font-size: 24px;
  font-weight: bold;
`;

/**
 * INPUT & LABEL
 */
export const InputSignInUp = styled.input`
  display: block;
  min-width: 250px;
  padding: 6px 12px;
  margin-bottom: 30px;
  border: 1px solid #b4b4b4;
  border-radius: 4px;

  font-size: 14px;
`;
export const LabelSignInUp = styled.label`
  display: block;
  margin-bottom: 10px;

  font-size: 14px;
`;

/**
 * BUTTON
 */
interface ButtonSignInUpProps {
  color?: string;
  backColor?: string;
  hoverColor?: string;
}
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;
export const ButtonSignInUp = styled.button<ButtonSignInUpProps>`
  padding: 10px 12px;
  margin-top: 20px;
  margin-left: 20px;
  border: 1px solid
    ${(props) => (props.backColor === '#438BFF' ? 'none' : '#bbbbbb')};
  border-radius: 4px;

  font-size: ${(props) => (props.backColor === '#438BFF' ? '15px' : '14px')};
  font-weight: 800;

  background-color: ${(props) => props.backColor};
  color: ${(props) => props.color};

  cursor: pointer;
  transition: all 0.1s ease-in;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

// #24E0BC
// #438BFF
// #2C5BF2
