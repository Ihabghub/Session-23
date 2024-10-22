import React, { useState } from 'react';
import { useTodoStore } from '../store/Store';

const Search: React.FC = () => {
  const { todos } = useTodoStore();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    todo.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search todos..."
      className="bg-gray-700 text-white p-2 rounded"
    />
  );
};

export default Search;
