import React, { useEffect, useState } from 'react';

import {
  HeadingOne,
  InputSignInUp,
  ButtonSignInUp,
} from '../../styledComponents/CommonStyle';
import {
  fetchGetTodoList,
  fetchCreateTodo,
  fetchDeleteTodo,
  fetchUpdateTodo,
} from '../apis/todoApis';
import { useNavigate } from 'react-router-dom';
import { TodoType } from '../../types/todoType';
import UpdateTodo from './UpdateTodo';

const TodoList = () => {
  const [onUpdate, setOnUpdate] = useState(false);

  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const [updating, setUpdating] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const userToken = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      alert('로그인된 유저만 사용할 수 있습니다.');
      navigate('/signin');
    }

    const initTodoList = async () => {
      const data = await fetchGetTodoList();
      setTodoList(data);
      const arr = new Array(data.length).fill(0);
      setUpdating(arr);
    };
    initTodoList();
  }, [userToken, navigate]);

  const handleNewTodoValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo = e.target.value;

    setNewTodo(newTodo);
  };
  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todos = await fetchCreateTodo(newTodo);
    setTodoList(todos);
    setNewTodo('');
  };

  const handleUpdateChecked = (todo: TodoType, idx: number) => {
    fetchUpdateTodo(todo, 1);

    const newTodoList = [...todoList];
    newTodoList[idx].isCompleted = !newTodoList[idx].isCompleted;
    setTodoList(newTodoList);
  };

  const handleDeleteTodo = async (id: number, idx: number) => {
    fetchDeleteTodo(id);

    const newTodoList = todoList.filter((v, i) => i !== idx);
    setTodoList(newTodoList);
  };

  const toggleOnUpdate = () => {
    setOnUpdate(!onUpdate);
  };

  return (
    <>
      <HeadingOne>TODO LIST</HeadingOne>
      <form>
        <InputSignInUp
          data-testid='new-todo-input'
          value={newTodo}
          onChange={handleNewTodoValue}
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
        {todoList &&
          todoList.map((todo, idx) => {
            return onUpdate === false ? (
              <li key={todo.id}>
                <label>
                  <input
                    type='checkbox'
                    name={String(todo.id)}
                    checked={todo.isCompleted}
                    onClick={() => handleUpdateChecked(todo, idx)}
                    onChange={() => console.log('changed')}
                  />
                  <span>{todo.todo}</span>
                  <ButtonSignInUp
                    data-testid='modify-button'
                    onClick={toggleOnUpdate}
                  >
                    수정
                  </ButtonSignInUp>
                  <ButtonSignInUp
                    data-testid='delete-button'
                    onClick={() => handleDeleteTodo(todo.id, idx)}
                  >
                    삭제
                  </ButtonSignInUp>
                </label>
              </li>
            ) : (
              <UpdateTodo
                key={idx}
                todo={todo}
                idx={idx}
                handleUpdateChecked={handleUpdateChecked}
                toggleOnUpdate={toggleOnUpdate}
                setTodoList={setTodoList}
              />
            );
          })}
      </ul>
    </>
  );
};

export default TodoList;
