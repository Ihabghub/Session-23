import React from 'react';
import { useTodoStore } from '../store/Store';
import TodoItem from '../components/TodoItem';

interface TodoListProps {
  done: boolean;
}

const TodoList: React.FC<TodoListProps> = ({ done }) => {
  const { todos } = useTodoStore();

  const filteredTodos = todos.filter((todo) => todo.done === done);

  return (
    <div className="w-1/2">
      <h2 className="text-2xl">{done ? 'Done Items' : 'Todo Items'}</h2>
      {filteredTodos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
