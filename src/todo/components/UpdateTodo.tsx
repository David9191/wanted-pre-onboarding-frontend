import { useState, Dispatch, SetStateAction } from 'react';

import { ButtonSignInUp } from '../../styledComponents/CommonStyle';
import { TodoType } from '../../types/todoType';
import { fetchGetTodoList, fetchUpdateTodo } from '../apis/todoApis';

interface UpdateTodoProps {
  todo: TodoType;
  idx: number;
  handleUpdateChecked: (todo: TodoType, idx: number) => void;
  toggleOnUpdate: () => void;
  setTodoList: Dispatch<SetStateAction<TodoType[]>>;
}

const UpdateTodo = ({
  todo,
  idx,
  handleUpdateChecked,
  toggleOnUpdate,
  setTodoList,
}: UpdateTodoProps) => {
  const [updateValue, setUpdateValue] = useState('');

  return (
    <li key={todo.id}>
      <label>
        <input
          type='checkbox'
          name={String(todo.id)}
          checked={todo.isCompleted}
          onClick={() => handleUpdateChecked(todo, idx)}
          onChange={() => console.log('changed')}
        />
        <input
          data-testid='modify-input'
          value={updateValue}
          onChange={(e) => setUpdateValue(e.target.value)}
        />
        <ButtonSignInUp
          data-testid='submit-button'
          onClick={async () => {
            const newTodo = { ...todo, todo: updateValue };

            await fetchUpdateTodo(newTodo, 0);
            toggleOnUpdate();
            const todos = await fetchGetTodoList();
            setTodoList(todos);
          }}
        >
          제출
        </ButtonSignInUp>
        <ButtonSignInUp data-testid='cancel-button' onClick={toggleOnUpdate}>
          취소
        </ButtonSignInUp>
      </label>
    </li>
  );
};

export default UpdateTodo;
