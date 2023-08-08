import { useEffect, useState } from 'react';

import Header from '../components/Header';
import { SignInStyle } from '../styledComponents/SignInStyle';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  password: string;
  [key: string]: string;
}

interface token {
  access_token: string;
}

const SignIn = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

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

  const handleSignIn = async () => {
    const response = await fetch(
      'https://www.pre-onboarding-selection-task.shop/auth/signin',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }
    );
    const data: token = await response.json();

    localStorage.setItem('token', data.access_token);

    alert(response.status);
    console.log(data);

    navigate('/todo');
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
        <h1>로그인</h1>
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
          data-testid='signin-button'
          className='singin-button'
          disabled={buttonDisabled}
          onClick={handleSignIn}
        >
          로그인
        </button>
      </SignInStyle>
    </>
  );
};

export default SignIn;
