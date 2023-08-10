import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  HeadingOne,
  InputSignInUp,
  LabelSignInUp,
  SignInUpBlock,
  ButtonSignInUp,
  ButtonContainer,
  SignInUpMainContainer,
} from '../../styledComponents/SignInUpStyle';
import { User } from '../../types/userTypes';

const SignUp = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isToken = localStorage.getItem('token');

    if (isToken) {
      navigate('/todo');
    }
  }, [navigate]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserInfo = { ...user };
    newUserInfo[e.target.name] = e.target.value;

    setUser(newUserInfo);
  };

  const handleSignUp = async () => {
    const response = await fetch(
      'https://www.pre-onboarding-selection-task.shop/auth/signup',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    const responseStatus = response.status;

    if (responseStatus === 200) {
      navigate('/signin');
    } else if (responseStatus === 401) {
      alert('회원가입에 실패했습니다.');
    }
  };

  useEffect(() => {
    const regex = /@/;

    if (regex.test(user.email) && user.password.length >= 8) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <SignInUpBlock>
      <SignInUpMainContainer>
        <HeadingOne>회원가입</HeadingOne>

        <LabelSignInUp htmlFor='siginin-email' className='label-text'>
          이메일
        </LabelSignInUp>
        <InputSignInUp
          type='text'
          id='siginin-email'
          data-testid='email-input'
          name='email'
          value={user.email}
          onChange={handleFormChange}
        />

        <LabelSignInUp htmlFor='siginin-password' className='label-text'>
          비밀번호
        </LabelSignInUp>
        <InputSignInUp
          type='password'
          id='siginin-password'
          data-testid='password-input'
          name='password'
          value={user.password}
          onChange={handleFormChange}
        />

        <ButtonContainer>
          <ButtonSignInUp
            data-testid='signup-button'
            className='singup-button'
            disabled={buttonDisabled}
            onClick={handleSignUp}
            color='#fff'
            backColor='#438BFF'
            hoverColor='#2c5bf2'
          >
            회원가입
          </ButtonSignInUp>
        </ButtonContainer>
      </SignInUpMainContainer>
    </SignInUpBlock>
  );
};

export default SignUp;
