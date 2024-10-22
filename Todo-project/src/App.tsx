import React, { useState } from 'react';
import { useTodoStore } from './store/Store'; // Make sure the path is correct
import TodoList from './components/TodoList'; // Correct import for TodoList
import Search from './components/Search';
import Form from './components/Form'; // Ensure Form is in the components folder
import './App.css'; // Tailwind or any custom CSS

const App: React.FC = () => {
  const { sortTodos } = useTodoStore();
  const [sortType, setSortType] = useState<'priority' | 'dueDate'>('priority');

  const handleSort = (type: 'priority' | 'dueDate') => {
    setSortType(type);
    sortTodos(type);
  };

  return (
      <div className="min-h-screen bg-black text-white p-8 rounded-3xl">
        <header className="flex justify-between items-center">
          <h1 className="text-4xl">tasX - get things done</h1>
          <Search />
        </header>

        <div className="mt-8">
          <Form />
          <div className="mt-4 flex justify-end space-x-4">
            <button
              className="bg-yellow-500 p-2 rounded"
              onClick={() => handleSort('priority')}
            >
              Sort by Priority
            </button>
            <button
              className="bg-yellow-500 p-2 rounded"
              onClick={() => handleSort('dueDate')}
            >
              Sort by Due Date
            </button>
          </div>
          <div className="mt-8 flex space-x-4">
            <TodoList done={false} />
            <TodoList done={true} />
          </div>
        </div>
      </div>
  );
};

export default App;
