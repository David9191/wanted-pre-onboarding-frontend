import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {
  HeadingOne,
  InputSignInUp,
  ButtonSignInUp,
} from '../../styledComponents/CommonStyle';

const Todo = () => {
  const [newTodo, setNewTodo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('로그인된 유저만 사용할 수 있습니다.');
      navigate('/signin');
    }
  }, [navigate]);

  const handleNewTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = e.target.value;

    setNewTodo(newTodo);
  };

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userToken = localStorage.getItem('token');
    console.log(userToken);

    const response = await fetch(
      'https://www.pre-onboarding-selection-task.shop/todos',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: newTodo,
        }),
      }
    );
    const data = await response.json();

    console.log(data);
  };

  return (
    <>
      <HeadingOne>TODO LIST</HeadingOne>
      <form>
        <InputSignInUp
          data-testid='new-todo-input'
          value={newTodo}
          onChange={handleNewTodo}
        />
        <ButtonSignInUp
          type='submit'
          data-testid='new-todo-add-button'
          onClick={handleAddTodo}
        >
          추가
        </ButtonSignInUp>
      </form>
      <ul>
        <li>
          <label>
            <input type='checkbox' />
            <span>TODO 1</span>
          </label>
        </li>
      </ul>
    </>
  );
};

export default Todo;
