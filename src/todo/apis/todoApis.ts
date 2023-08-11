import { TodoType } from '../../types/todoType';

const userToken = localStorage.getItem('token');

// GET
export const fetchGetTodoList = async () => {
  try {
    const response = await fetch(
      'https://www.pre-onboarding-selection-task.shop/todos',
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

// CREATE
export const fetchCreateTodo = async (todo: string) => {
  try {
    await fetch('https://www.pre-onboarding-selection-task.shop/todos', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todo,
      }),
    });

    return fetchGetTodoList();
  } catch (error) {
    console.error(error);
  }
};

// UPDATE
export const fetchUpdateTodo = async (todo: TodoType, completed: number) => {
  try {
    await fetch(
      `https://www.pre-onboarding-selection-task.shop/todos/${todo.id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todo: todo.todo,
          isCompleted: completed ? !todo.isCompleted : todo.isCompleted,
        }),
      }
    );
  } catch (error) {
    console.error('수정에 실패했습니다.');
  }
};

// DELETE
export const fetchDeleteTodo = async (id: number) => {
  try {
    await fetch(`https://www.pre-onboarding-selection-task.shop/todos/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
