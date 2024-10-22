import React, { useState } from 'react';
import { useTodoStore } from '../store/Store'; // Ensure correct path

const Form: React.FC = () => {
  const { addTodo } = useTodoStore();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      title,
      content,
      priority,
      dueDate,
      done: false,
    };
    addTodo(newTodo);
    setTitle('');
    setContent('');
    setPriority(1);
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-2 bg-gray-800 text-white"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Details"
        className="w-full p-2 bg-gray-800 text-white"
      />
      <input
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        min={1}
        max={5}
        className="w-full p-2 bg-gray-800 text-white"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 bg-gray-800 text-white"
      />
      <button type="submit" className="bg-green-500 p-2 rounded">
        Add Todo
      </button>
    </form>
  );
};

export default Form;
