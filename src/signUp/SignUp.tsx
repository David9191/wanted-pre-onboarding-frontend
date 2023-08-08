import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../components/Header';
import { SignInStyle } from '../styledComponents/SignInStyle';

interface User {
  email: string;
  password: string;
  [key: string]: string;
}

const SignUp = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  // 얘네들은 나중에 react-router로 처리해보자.
  useEffect(() => {
    const isToken = localStorage.getItem('token');

    if (isToken) {
      navigate('todo');
    }
  }, []);

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

    alert(response.status);

    navigate('/signin');
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
    <>
      <Header />
      <SignInStyle>
        <h1>회원가입</h1>
        <label htmlFor='siginin-email' className='label-text'>
          이메일
        </label>
        <input
          type='text'
          id='siginin-email'
          data-testid='email-input'
          name='email'
          value={user.email}
          onChange={handleFormChange}
        />

        <label htmlFor='siginin-password' className='label-text'>
          비밀번호
        </label>
        <input
          type='password'
          id='siginin-password'
          data-testid='password-input'
          name='password'
          value={user.password}
          onChange={handleFormChange}
        />

        <button
          data-testid='signup-button'
          className='singup-button'
          disabled={buttonDisabled}
          onClick={handleSignUp}
        >
          회원가입
        </button>
      </SignInStyle>
    </>
  );
};

export default SignUp;
