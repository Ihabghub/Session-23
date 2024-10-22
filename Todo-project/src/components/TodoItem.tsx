import React, { useState } from 'react';
import { useTodoStore } from '../store/Store';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TodoItemProps {
  todo: {
    id: number;
    title: string;
    content: string;
    priority: number;
    dueDate: string;
    done: boolean;
  };
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, editTodo } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleToggle = () => toggleTodo(todo.id);
  const handleDelete = () => deleteTodo(todo.id);
  const handleSave = () => {
    editTodo(editedTodo);
    setIsEditing(false);
  };

  const isDueSoon = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const timeDiff = due.getTime() - today.getTime();
    return timeDiff <= 24 * 60 * 60 * 1000; // Due in 24 hours
  };

  return (
    <div className={`p-4 border ${isDueSoon(todo.dueDate) ? 'border-red-500' : 'border-gray-300'} rounded-md mb-4`}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTodo.title}
            onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
            className="w-full mb-2 p-2 bg-gray-800 text-white"
          />
          <textarea
            value={editedTodo.content}
            onChange={(e) => setEditedTodo({ ...editedTodo, content: e.target.value })}
            className="w-full p-2 bg-gray-800 text-white"
          />
          <button onClick={handleSave} className="bg-green-500 p-2 rounded mt-2">
            Save
          </button>
        </div>
      ) : (
        <div>
          <h3 className="text-xl">{`(${todo.priority}) ${todo.title}`}</h3>
          <p>{todo.content}</p>
          <p className="text-yellow-500">{Math.ceil((new Date(todo.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} Days</p>
          <button onClick={handleToggle} className="bg-blue-500 p-2 rounded mt-2">
            {todo.done ? 'Mark as Todo' : 'Mark as Done'}
          </button>
          <button onClick={() => setIsEditing(true)} className="ml-2 text-yellow-500">
            <FaEdit />
          </button>
          <button onClick={handleDelete} className="ml-2 text-red-500">
            <FaTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
